import React from 'react';
import Video from "react-h5-video";
import en1 from '../../locale-data/en.json';
import fr1 from '../../locale-data/fr.json';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl';
addLocaleData([...en, ...fr]);
import classNames from 'classnames/bind';
import styles from '../css/components/film';

const cx = classNames.bind(styles);
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
        var url = 'https://localhost:3001/api/film/' + this.props.idImdb
        var subFr = this.props.subFr ? <track kind="subtitles" label="Francais" src={this.props.subFr} srcLang="fr"/> : ""
        var subEn = this.props.subEn ? <track kind="subtitles" label="English" src={this.props.subEn} srcLang="fr"/> : ""
        return (
            <IntlProvider locale='fr' messages={fr1} >
                <div>
                    {/*<FormattedMessage*/}
                        {/*id="welcome"*/}
                        {/*defaultMessage={`Welcome`}*/}
                    {/*/>*/}

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

                    <video width='800' height='600' className={cx('videoPlayer')} controls='controls' preload='auto' src={url}>
                        {subFr}
                        {subEn}
                    </video>


                </div>
            </IntlProvider>
        );
    }
}
export default MovieBox;
