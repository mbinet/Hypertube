import React, { Component } from 'react';
import Page from '../pages/Page';
import DashboardContainer from '../containers/Dashboard';
import cookie from 'react-cookie';

class Dashboard extends Component {
    componentWillMount(){
        this.state = { userId: cookie.load('userId') };
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

    render() {
        return (
            <Page {...this.getMetaData()}>
              <DashboardContainer {...this.props} userId={this.state.userId} />
            </Page>
        );
    }
}

export default Dashboard;

