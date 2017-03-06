import React from 'react';
import Video from "react-h5-video";

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */

// Video.propTypes = {
//     autoHideControls: true,
//     autoPlay: true,
//     controlPanelStyle: "overlay",
//     controls: true,
//     loop: false,
//     mute: false,
//     preload: "auto",
//     seekDisabled: false
// }

const Film = () =>
    <div>
        <script src='//vjs.zencdn.net/5-unsafe/video.js' />
        <link href='//vjs.zencdn.net/5.4.6/video-js.min.css' rel='stylesheet' />
        <link rel="stylesheet" type="text/css" href="/node_modules/react-h5-video/lib/react-h5-video.css" />
        <div>This is the film page ahah</div>
        {/*<video width='800' height='600' controls='controls' preload='auto'*/}
               {/*src="http://localhost:3000/api/film/Guardians.of.the.Galaxy.2014.1080p.BluRay.x264.YIFY.mp4">*/}
            {/*<track src="./jrigole.vtt" kind="subtitle" label="English" />*/}
        {/*</video>*/}
        {/*<video className='video-js vjs-default-skin vjs-big-play-centered' width='800' height='600' controls='controls' preload='auto'*/}
               {/*src="http://localhost:3000/api/film/Guardians.of.the.Galaxy.2014.1080p.BluRay.x264.YIFY.mp4">*/}
            {/*<track src="./jrigole.vtt" kind="subtitle" label="English" />*/}
        {/*</video>*/}
        <Video sources={[ "http://localhost:3000/api/film/Guardians.of.the.Galaxy.2014.1080p.BluRay.x264.YIFY.mp4"]}
               poster="./video/poster.png"
        >
            <h3 className="video-logo pull-right"><a href="http://glexe.com" target="_blank">LOGO</a></h3>
            <p>Any HTML content</p>
        </Video>
    </div>;

export default Film;
