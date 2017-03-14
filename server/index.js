import express from 'express';
import webpack from 'webpack';
import { isDebug } from '../config/app';
import { connect } from './db';
import initPassport from './init/passport';
import initExpress from './init/express';
import initRoutes from './init/routes';
import renderMiddleware from './render/middleware';

const app = express();

/*
 * Database-specific setup
 * - connect to MongoDB using mongoose
 * - register mongoose Schema
 */
connect();

/*
 * REMOVE if you do not need passport configuration
 */
initPassport();

if (isDebug) {
  // enable webpack hot module replacement
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../webpack/webpack.config');
  const devBrowserConfig = webpackConfig('browser');
  const compiler = webpack(devBrowserConfig);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: devBrowserConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

/*
 * Bootstrap application settings
 */
initExpress(app);

/*
 * REMOVE if you do not need any routes
 *
 * Note: Some of these routes have passport and database model dependencies
 */
initRoutes(app);

/*
 * This is where the magic happens. We take the locals data we have already
 * fetched and seed our stores with data.
 * renderMiddleware matches the URL with react-router and renders the app into
 * HTML
 */

var fs = require('fs');
var srt2vtt = require('srt2vtt');
var torrentStream = require('torrent-stream');
const path = require('path');
const parseRange = require('range-parser');
var https = require('https');
var Promise = require("bluebird");
const OS = require('opensubtitles-api');
var axios = require('axios');
const OpenSubtitles = new OS({
    useragent:'OSTestUserAgentTemp',
    username: 'Hypertube',
    password: 'dotef',
    ssl: true
});

var useragent = require('express-useragent');
app.use(useragent.express());

app.use(require('forest-express-mongoose').init({
    modelsDir: './server/db/mongo/models', // Your models directory.
    envSecret: process.env.FOREST_ENV_SECRET,
    authSecret: process.env.FOREST_AUTH_SECRET,
    mongoose: require('mongoose') // The mongoose database connection.
}));

//***********//
// SUBTITLES //
//***********//

app.get('/api/getSubs/:idImdb', function (req, res, next) {
    console.log(req.params.idImdb);
    OpenSubtitles.login()
        .then(resu => {
            OpenSubtitles.search({
                sublanguageid: 'eng,fre',       // Can be an array.join, 'all', or be omitted.
                // hash: rows[0].hash,   // Size + 64bit checksum of the first and last 64k
                //path: rows[0].path,        // Complete path to the video file, it allows
                //   to automatically calculate 'hash'.
                //filename: rows[0].path.substring(rows[0].path.lastIndexOf("/" + 1)),        // The video file name. Better if extension
                extensions: 'srt', // Accepted extensions, defaults to 'srt'.
                limit: 'best',  // Can be 'best', 'all' or an
                                // arbitrary nb. Defaults to 'best'
                imdbid: req.params.idImdb,   // Text-based query, this is not recommended.
                // query: "big hero 6"
            }).then(subtitles => {
                getSubs(subtitles, req.params.idImdb).then(function (str) {
                    res.json({message: 'Ca a marché', subFr: req.params.idImdb + ".fr.vtt", subEn: req.params.idImdb + ".en.vtt"});
                });
            })
        })
        .catch(err => {
            console.log(err);
        });
    // next()
});

const getSubs = function(subtitles, idImdb) {
    console.log(subtitles);
    console.log(idImdb);
    return new Promise(function (resolve, reject) {
        var fileEn = fs.createWriteStream("./app/sub/" + idImdb + ".en.srt");
        var requestEn = https.get(subtitles.en.url, function (response) {
            var srt = response.pipe(fileEn);
            srt.on('finish', function () {
                var srtData = fs.readFileSync('./app/sub/' + idImdb + '.en.srt');
                srt2vtt(srtData, function(err, vttData) {
                    if (err) throw new Error(err);
                    fs.writeFileSync('./app/sub/' + idImdb + '.en.vtt', vttData);
                });
            })
        });
        var fileFr = fs.createWriteStream("./app/sub/" + idImdb + ".fr.srt");
        var requestFr = https.get(subtitles.fr.url, function (response) {
            var srt = response.pipe(fileFr);
            srt.on('finish', function () {
                var srtData = fs.readFileSync('./app/sub/'+ idImdb + '.fr.srt');
                srt2vtt(srtData, function(err, vttData) {
                    if (err) throw new Error(err);
                    fs.writeFileSync('./app/sub/' + idImdb + '.fr.vtt', vttData);
                });
            })
        });
        resolve("dowloaded");
    });
};

/*
** returns the subtitle file asked
 */

app.get('/api/sub/:filename', function (req, res, next) {
    fs.readFile('./app/sub/' + req.params.filename, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        res.send(data);
    });
});


//***********//
//    CSS    //
//***********//

/*
** returns the css file for react-html5-video module
 */

app.get('/api/getVideoCss', function (req, res, next) {
    fs.readFile('./node_modules/react-h5-video/lib/react-html5-video.css', function (err, data) {
        if (err) {
            res.writeHead(500)
            console.log(err);
        }
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.end(data);
    });
});

app.get('/api/getAntdCss', function (req, res, next) {
    fs.readFile('./node_modules/antd/dist/antd.min.css', function (err, data) {
        if (err) {
            res.writeHead(500)
            console.log(err);
        }
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.end(data);
    });
});


//***********//
//   VIDEO   //
//***********//

/*
**  Get a film (download + stream) from IMDB id
 */

var runningCommands = {};

app.get('/api/film/:idImdb', function (req, res, next) {
    res.setHeader('Accept-Ranges', 'bytes');
    console.log(req.useragent.browser);
    getMagnet(req.params.idImdb, function(data) {
        const engine = torrentStream(data, {
            path: '/tmp/film'
        });
        getTorrentFile(engine).then(function (file) {
            const ranges = parseRange(file.length, req.headers.range, {combine: true});
            console.log(ranges);
            if (file.ext == 'mkv') {// && req.useragent.browser == 'Firefox') {
                res.setHeader('Content-Length', file.length);
                if (ranges === -1) {
                    res.statusCode = 416;
                    return res.end();
                }
                else if (ranges === -2 || ranges.type !== 'bytes' || ranges.length > 1) {
                    if (req.method !== 'GET') return res.end();
                    var stream = file.createReadStream().pipe(res);
                }
                else {
                    const range = ranges[0];
                    res.statusCode = 206;
                    res.setHeader('Content-Length', 1 + range.end - range.start);
                    res.setHeader('Content-Range', `bytes ${range.start}-${range.end}/${file.length}`);
                    if (req.method !== 'GET') return res.end();
                    var stream = file.createReadStream(range);
                }
                if (stream) {
                    var id = Math.floor(Math.random() * 10001);
                    runningCommands[id] = ffmpeg(stream).videoCodec('libvpx').audioCodec('libvorbis').format('webm')
                        .audioBitrate(128)
                        .videoBitrate(1024)
                        .outputOptions([
                            '-threads 8',
                            '-deadline realtime',
                            '-error-resilient 1'
                        ])
                        .on('start', function (cmd) {
                            //console.log('this has started ' + cmd);

                        })
                        .on('end', function () {
                            delete runningCommands[id];
                        })
                        .on('error', function (err) {
                            console.log("error now happening");
                            console.log(err);
                            delete runningCommands[id];
                            console.log("runningCommands[id] is deleted from id " + id);
                        });
                    console.log("oui je suis un mkv");
                    runningCommands[id].pipe(res);
                }
            }
            else {
                res.setHeader('Content-Length', file.length);
                res.setHeader('Content-Type', `video/${file.ext}`);
                if (ranges === -1) {
                    // 416 Requested Range Not Satisfiable
                    res.statusCode = 416;
                    return res.end();
                } else if (ranges === -2 || ranges.type !== 'bytes' || ranges.length > 1) {
                    // 200 OK requested range malformed or multiple ranges requested, stream entire video
                    if (req.method !== 'GET') return res.end();
                    return file.createReadStream().pipe(res);
                } else {
                    // 206 Partial Content valid range requested
                    const range = ranges[0];
                    res.statusCode = 206;
                    res.setHeader('Content-Length', 1 + range.end - range.start);
                    res.setHeader('Content-Range', `bytes ${range.start}-${range.end}/${file.length}`);
                    if (req.method !== 'GET') return res.end();
                    console.log("oui je suis un mp4")
                    return file.createReadStream(range).pipe(res);
                }
            }
        }).catch(function (e) {
            console.error(e);
            res.end(e);
        });

    })
});

function getMagnet(id, callback) {
    var url = "https://yts.ag/api/v2/list_movies.json?query_term=" + id

    axios.get(url)
        .then(function (response) {
            var result = response.data.data;
            var torrentHash = "";
            for (var d of result.movies[0].torrents) {
                if (d.quality == '720p')
                    torrentHash = d.hash;
            }
            // var torrentHash = response.data.data.movies[0].torrents[0].hash
            var name = encodeURI(response.data.data.movies[0].title)
            var magnet="magnet:?xt=urn:btih:"+torrentHash+"&dn="+name+"&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://glotorrents.pw:6969/announce"

            // this is a mkv
            //callback('magnet:?xt=urn:btih:7e1581f588474b7fa744ca4b4f37f4bf139af644&dn=Office.Christmas.Party.2016.1080p.WEB-DL.DD5.1.H264-FGT&tr=http%3A%2F%2Ftracker.trackerfix.com%3A80%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2710&tr=udp%3A%2F%2F9.rarbg.to%3A2710')
            callback(magnet)
        })
}

const getTorrentFile = function(engine) {
    return new Promise(function (resolve, reject) {
        var tmp_len = 0;
        var tmp_file = null;
        engine.on('ready', function () {
            engine.files.forEach(function (file, idx) {
                // console.log(file.length);
                const ext = path.extname(file.name).slice(1);
                if (ext === 'mkv' || ext === 'mp4') {
                    if (file.length > tmp_len) {
                        file.ext = ext;
                        tmp_len = file.length;
                        tmp_file = file;
                    }
                }
            });
            resolve(tmp_file);
        });
    });
};

app.get('*', renderMiddleware);


app.listen(app.get('port'));
