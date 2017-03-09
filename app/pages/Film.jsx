import React, { Component } from 'react';
import Page from '../pages/Page';
import FilmContainer from '../containers/Film';
import MovieBox from '../components/MovieBox';
import axios from 'axios';

class Film extends Component {

    constructor() {
        super();
        this.state = {
            subFr: "",
            subEn: "",
            message: ""
        }
    }

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
        var that = this
        axios.get('/api/getSubs/jrigole')
            .then((response) => {
              that.setState({
                subFr: '/api/sub/' + response.data.subFr,
                subEn: '/api/sub/' + response.data.subEn,
                message: response.data.message
              })
              console.log(this.state.subFr);
            });
    }

    render() {
        return (
            <Page {...this.getMetaData()}>
                {/*<FilmContainer {...this.props} message={'bonjour'} />*/}
                <MovieBox message={this.state.message} subFr={this.state.subFr} subEn={this.state.subEn}r/>
            </Page>
        );
    }
}

export default Film;
