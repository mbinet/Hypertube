import React, { Component } from 'react';
import Page from '../pages/Page';
import UserUpdateContainer from '../containers/UserUpdate';
import cookie from 'react-cookie'
import axios from 'axios';

class Film extends Component {

    constructor() {
        super();
        this.state = {
            user: {
                profile: {
                    picture: ""
                }
            },
            userCookie: {}
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
        return 'User Update | HyperFastTube';
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

        axios.get('/api/getUser/' + this.props.params.idUser)
            .then((response) => {
                this.setState({
                    user: response.data.user
                })
            })

        var userCookie;
        if (userCookie = cookie.load('user')) {
            if (userCookie[0] == 'j') {
                userCookie = userCookie.substr(2)
                userCookie = JSON.parse(userCookie)
            }
            this.setState({
                userCookie: userCookie
            })
        }
    }

    render() {
        return (
            <Page {...this.getMetaData()}>
                <UserUpdateContainer user={this.state.user} cookieUser={this.state.userCookie} />
            </Page>
        );
    }
}

export default Film;
