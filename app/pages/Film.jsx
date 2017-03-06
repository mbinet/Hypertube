import React, { Component } from 'react';
import Page from '../pages/Page';
import FilmContainer from '../containers/Film';
import axios from 'axios';

class Film extends Component {
    getMetaData() {
        return {
            title: this.pageTitle(),
            meta: this.pageMeta(),
            link: this.pageLink()
        };
    }

    pageTitle() {
        return 'DASHBOARD | reactGo';
    }

    pageMeta() {
        return [
            { name: 'description', content: 'A reactGo example of a dashboard page' }
        ];
    }

    pageLink() {
        return [];
    }

    componentWillMount() {

        axios.get('/api/getSubs/jrigole')
            .then(function (response) {
                console.log(response.data)
            })

        // var fs = New fs;
        // var srt2vtt = require('srt-to-vtt');
        // fs.createReadStream('/jelly.srt')
        //     .pipe(srt2vtt())
        //     .pipe(fs.createWriteStream('/jellylol.vtt'))
        // console.log("COUCOU")
    }

    render() {
        return (
            <Page {...this.getMetaData()}>
                <FilmContainer {...this.props} />
            </Page>
        );
    }
}

export default Film;

