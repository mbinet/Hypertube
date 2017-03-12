import React from 'react';
import axios from 'axios'
import ResultList from './ResultList'
import classNames from 'classnames/bind';
import styles from '../css/components/movieList';


const cx = classNames.bind(styles);

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
        res: [],
        queries: this.props.queries,
    }
}
componentWillReceiveProps(nextProps) {
    var _this = this;
    this.serverRequest =
      axios
        .get(this.props.url)
        .then(function(result) {
          _this.setState({
            res: result.data.data
          });
        })
}

  render() {
    return (
    <div className={cx('resultsDiv')}>

    <ResultList result={this.state.res} queries={this.state.queries}/>

    </div>
  );
  }
}
export default SearchResults;
