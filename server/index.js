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

const getTorrentFile = function(engine) {
    return new Promise(function (resolve, reject) {
        engine.on('ready', function () {
            engine.files.forEach(function (file, idx) {
                const ext = path.extname(file.name).slice(1);
                if (ext === 'mkv' || ext === 'mp4') {
                    file.ext = ext;
                    resolve(file);
                }
            });
        });
    });
}

const getSubs = function(subtitles) {
    return new Promise(function (resolve, reject) {
        var fileEn = fs.createWriteStream("./app/images/" + "big_hero_6" + ".en.srt");
        var requestEn = https.get(subtitles.en.url, function (response) {
            var srt = response.pipe(fileEn);
            srt.on('finish', function () {
                var srtData = fs.readFileSync('./app/images/big_hero_6.en.srt');
                srt2vtt(srtData, function(err, vttData) {
                    if (err) throw new Error(err);
                    fs.writeFileSync('./app/images/big_hero_6.en.vtt', vttData);
                });
            })
        });
        var fileFr = fs.createWriteStream("./app/images/" + "big_hero_6" + ".fr.srt");
        var requestFr = https.get(subtitles.fr.url, function (response) {
            var srt = response.pipe(fileFr);
            srt.on('finish', function () {
                var srtData = fs.readFileSync('./app/images/big_hero_6.fr.srt');
                srt2vtt(srtData, function(err, vttData) {
                    if (err) throw new Error(err);
                    fs.writeFileSync('./app/images/big_hero_6.fr.vtt', vttData);
                });
            })
        });
        resolve("dowloaded");
    });
};

app.get('/api/getSubs/:name', function (req, res, next) {
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
                imdbid: "tt2245084",   // Text-based query, this is not recommended.
                query: "big hero 6"
            }).then(subtitles => {
                getSubs(subtitles).then(function (str) {
                    res.json({message: 'CA A MARCHE LOL', subFr: "big_hero_6.fr.vtt", subEn: "big_hero_6.en.vtt"});
                });
            })
        })
        .catch(err => {
            console.log(err);
        });
    // next()
});

app.get('/api/sub/:filename', function (req, res, next) {
    fs.readFile('./app/images/' + req.params.filename, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        res.send(data);
    });
});

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

app.get('/api/film/:idImdb', function (req, res, next) {
    res.setHeader('Accept-Ranges', 'bytes');
    getMagnet(req.params.idImdb, function(data) {
        const engine = torrentStream(data, {
            path: '/tmp/film'
        });
        getTorrentFile(engine).then(function (file) {
            res.setHeader('Content-Length', file.length);
            res.setHeader('Content-Type', `video/${file.ext}`);
            const ranges = parseRange(file.length, req.headers.range, { combine: true });
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
                return file.createReadStream(range).pipe(res);
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
            var magnet="magnet:?xt=urn:btih:"+torrentHash+"&dn="+name+"&tr=http://track.one:1234/announce&tr=udp://track.two:80"
            console.log(magnet)
            callback(magnet)
        })
}

app.get('*', renderMiddleware);


app.listen(app.get('port'));
