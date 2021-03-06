import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import Page from '../pages/Page';
import FilmContainer from '../containers/Film';
import MovieBox from '../components/MovieBox';
import axios from 'axios';
import { DatePicker } from 'antd';
import cookie from 'react-cookie';

class Film extends Component {

    constructor() {
        super();
        this.state = {
            subFr: "",
            subEn: "",
            year: "",
            runtime:"",
            mparating:"",
            title: "",
            rating: "",
            genre: [],
            synopsis: "",
            language: "",
            img: ""
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
        var userCookie;
        if (userCookie = cookie.load('user')) {
            if (userCookie[0] == 'j') {
                userCookie = userCookie.substr(2)
                userCookie = JSON.parse(userCookie)
            }

            var that = this;

            axios.get('/api/getDetails/' + this.props.params.idImdb)
                .then((response) => {
                    if (response.data.msg == 'ok') {
                        that.setState({
                            title: response.data.title,
                            year: response.data.year,
                            runtime:response.data.runtime,
                            mparating: response.data.mparating,
                            rating: response.data.rating,
                            genres: response.data.genres,
                            synopsis: response.data.synopsis,
                            language: response.data.language,
                            img: response.data.img
                        });
                        axios.get('/api/getSubs/' + this.props.params.idImdb)
                            .then((response) => {
                                that.setState({
                                    subFr: response.data.subFr != 'false' ? '/api/sub/' + response.data.subFr : "",
                                    subEn: response.data.subEn != 'false' ? '/api/sub/' + response.data.subEn : "",
                                })
                            }).catch(function () {
                            console.log("Promise Rejected");
                        });

                        axios.post('/api/addToSeen', {
                            userId: userCookie._id,
                            idImdb: this.props.params.idImdb
                        }).then(function (response) {
                            axios.get('/api/getUser/' + userCookie._id)
                                .then((response) => {
                                    cookie.remove('user', { path: '/' });
                                    var user = response.data.user;
                                    user.profile.picture = "";
                                    cookie.save('user', user, { path: '/' });
                                })
                        }).catch(function () {
                            console.log("Promise Rejected");
                        });
                    }
                    else {
                        // console.log("JE CRASH " + response.data.msg); //ICI IL FAUT FAIRE UNE REDIRECTION

                        setTimeout(function() {
                            browserHistory.push('/');
                        }, 500);
                    }
                }).catch(function () {
                console.log("Promise Rejected");
            });
        }
    }

    render() {
        return (
            <Page {...this.getMetaData()}>
                {/*<DatePicker />*/}
                <FilmContainer {...this.props}
                               message={''}
                               year={this.state.year}
                               runtime={this.state.runtime}
                               mparating={this.state.mparating}
                               subFr={this.state.subFr}
                               subEn={this.state.subEn}
                               idImdb={this.props.params.idImdb}
                               title={this.state.title}
                               rating={this.state.rating}
                               genres={this.state.genres}
                               synopsis={this.state.synopsis}
                               language={this.state.language}
                               img={this.state.img}
                />
            </Page>
        );
    }
}

export default Film;
