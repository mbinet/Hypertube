import React from 'react';
import Video from "react-h5-video";

/**
 * A counter button: tap the button to increase the count.
 */
class MovieBox extends React.Component {
    constructor() {
        super();
        this.state = {
            query_term: "",
        };
    }

    render() {
        var url = 'http://localhost:3000/api/film/' + this.props.idImdb
        return (
            <div>

                {/*<script src='//vjs.zencdn.net/5-unsafe/video.js' />*/}
                {/*<link href='//vjs.zencdn.net/5.4.6/video-js.min.css' rel='stylesheet' />*/}
                {/*<link rel="stylesheet" type="text/css" href="/node_modules/react-h5-video/lib/react-h5-video.css" />*/}

                {/*<video className='video-js vjs-default-skin vjs-big-play-centered' width='800' height='600' controls='controls' preload='auto'*/}
                {/*src="http://localhost:3000/api/film/Guardians.of.the.Galaxy.2014.1080p.BluRay.x264.YIFY.mp4">*/}
                {/*<track src="./jrigole.vtt" kind="subtitle" label="English" />*/}
                {/*</video>*/}

                {/*<Video sources={ ["http://localhost:3000/api/film/tt2245084"] }*/}
                       {/*poster="./video/poster.png"*/}
                       {/*subtitles={[*/}
                           {/*{src: this.props.subFr, label: 'Français', lang: 'fr'},*/}
                           {/*{src: this.props.subEn, label: 'English', lang: 'en'}]}*/}
                       {/*width="100%"*/}
                       {/*height="100%"*/}
                       {/*controlPanelStyle={'overlay'}*/}
                {/*>*/}
                {/*</Video>*/}

                <video width='800' height='600' controls='controls' preload='auto'
                src={url}>
                    <track kind="subtitles" label="Francais" src={this.props.subFr} srcLang="fr"/>
                    <track kind="subtitles" label="English" src={this.props.subEn} srcLang="en"/>
                </video>


            </div>
        );
    }
}
export default MovieBox;
