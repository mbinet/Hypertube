import React, { Component } from 'react';
import Page from '../pages/Page';
import SearchContainer from '../containers/Search';
import DashboardContainer from '../containers/Dashboard';
import SearchForm from '../components/searchform';

class Search extends Component {
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
        <SearchContainer {...this.props} />
      </Page>
    );
  }
}

export default Search;
