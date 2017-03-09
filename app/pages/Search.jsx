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
    return 'HYPERTUBE | Search';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Search new movies o watch!' }
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
