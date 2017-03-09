import React from 'react';

/**
 * A counter button: tap the button to increase the count.
 */
class MovieBox extends React.Component {
    constructor() {
        super();
        this.state = {
            query_term: "",
        };
        console.warn(this)
    }

    render() {
        return (
            <div>

                {/*<script src='//vjs.zencdn.net/5-unsafe/video.js' />*/}
                {/*<link href='//vjs.zencdn.net/5.4.6/video-js.min.css' rel='stylesheet' />*/}
                {/*<link rel="stylesheet" type="text/css" href="/node_modules/react-h5-video/lib/react-h5-video.css" />*/}

                {/*<video className='video-js vjs-default-skin vjs-big-play-centered' width='800' height='600' controls='controls' preload='auto'*/}
                {/*src="http://localhost:3000/api/film/Guardians.of.the.Galaxy.2014.1080p.BluRay.x264.YIFY.mp4">*/}
                {/*<track src="./jrigole.vtt" kind="subtitle" label="English" />*/}
                {/*</video>*/}
                {/*<Video sources={[ "http://localhost:3000/api/film/Guardians.of.the.Galaxy.2014.1080p.BluRay.x264.YIFY.mp4"]}*/}
                {/*poster="./video/poster.png"*/}
                {/*>*/}
                    {/*<h3 className="video-logo pull-right"><a href="http://glexe.com" target="_blank">LOGO</a></h3>*/}
                    {/*<p>Any HTML content</p>*/}
                {/*</Video>*/}

                <div>This is the film page ahah</div>
                <h1>{this.props.message}</h1>
                <h1>{this.props.subEn}</h1>
                <h1>{this.props.subFr}</h1>
                <video width='800' height='600' controls='controls' preload='auto'
                src="http://localhost:3000/api/film/Guardians.of.the.Galaxy.2014.1080p.BluRay.x264.YIFY.mp4">
                    <track kind="subtitles" label="Francais" src={this.props.subFr} srcLang="fr"/>
                    <track kind="subtitles" label="English" src={'/images/big_hero_6.en.vtt'} srcLang="en"/>
                    {/*<track kind="subtitles" label="English" src={require(this.props.subEn)} srcLang="en"/>*/}
                </video>
                <img src={require('images/favicon.png')}/>

            </div>
        );
    }
}
export default MovieBox;
