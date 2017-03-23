import React, { Component } from 'react';
import Page from '../pages/Page';
import UserContainer from '../containers/User';
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
            }
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
        return 'User | HyperFastTube';
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
    }

    render() {
        return (
            <Page {...this.getMetaData()}>
                <UserContainer user={this.state.user} />
            </Page>
        );
    }
}

export default Film;
