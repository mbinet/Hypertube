import React, { Component } from 'react';
import Page from '../pages/Page';
import DashboardContainer from '../containers/Dashboard';

class Test extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'TEST LOL | reactGo';
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
        <DashboardContainer {...this.props} />
      </Page>
    );
  }
}

export default Test;

