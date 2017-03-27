import React, { Component } from 'react';
import Page from '../pages/Page';
import AllUsersContainer from '../containers/AllUsers';
import cookie from 'react-cookie'
import axios from 'axios';

class Film extends Component {

    constructor() {
        super();
        this.state = {
            users: '',
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
        return 'All Users | HyperFastTube';
    }

    pageMeta() {
        return [
            { name: 'description', content: 'All users of HyperFastTube' }
        ];
    }

    pageLink() {
        return [ {rel: "apple-touch-icon", href: "node_modules/react-h5-video/lib/react-h5-video.css"} ];
    }

    componentWillMount() {

        axios.get('/api/getAllUsers/')
            .then((response) => {
                var result = JSON.stringify(response.data.users)
                // console.log("in page", result, typeof result)
                this.setState({
                    users: result
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
                <AllUsersContainer allUsers={this.state.users} usersObj={this.state.usersObj} cookieUser={this.state.userCookie} />
            </Page>
        );
    }
}

export default Film;
