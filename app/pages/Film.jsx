import React, { Component } from 'react';
import Page from '../pages/Page';
import FilmContainer from '../containers/Film';
import MovieBox from '../components/MovieBox';
import axios from 'axios';
import { DatePicker } from 'antd';

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
        return [ {rel: "apple-touch-icon", href: "node_modules/react-h5-video/lib/react-h5-video.css"} ];
    }

    componentWillMount() {
        var that = this
        axios.get('/api/getSubs/' + this.props.params.idImdb)
            .then((response) => {
                that.setState({
                    subFr: response.data.subFr != 'false' ? '/api/sub/' + response.data.subFr : "",
                    subEn: response.data.subEn != 'false' ? '/api/sub/' + response.data.subEn : "",
                    message: response.data.message
                })
            });
    }

    render() {
        return (
            <Page {...this.getMetaData()}>
                <h1>coucou</h1>
                <DatePicker />
                {/*<FilmContainer {...this.props} message={'bonjour'} />*/}
                <MovieBox message={this.state.message} subFr={this.state.subFr} subEn={this.state.subEn} idImdb={this.props.params.idImdb}/>
            </Page>
        );
    }
}

export default Film;
