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
        res: []
    }
}

componentWillReceiveProps(nextProps) {
  var _this = this;
  console.log("url", this.props.url)
  this.serverRequest =
    axios
      .get(_this.props.url)
      .then(function(result) {
        console.log("result:",result.data.data)
        _this.setState({
          res: result.data.data
        });
      })
}

  render() {
    return (
    <div className={cx('resultsDiv')}>
    <h2> results: </h2>
    <h3>{this.props.url}</h3>
    <ResultList result={this.state.res}/>
    </div>
  );
  }
}
export default SearchResults;
