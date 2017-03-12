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
        res: new Array(),
        queries: this.props.queries,
    }
}
componentWillReceiveProps(nextProps) {
    var _this = this;
    this.serverRequest =
      axios
        .get(this.props.url)
        .then(function(result) {
            console.log("in will recieveprops", _this.state.res, typeof _this.state.res)
        if (result.data.data.movies)
        {
            if (!_this.state.res || _this.state.res == null){
                console.warn("nul this state res movies")
              _this.setState({
                res: result.data.data.movies
                });}
            else{
                var newSet = _this.state.res
                result.data.data.movies.forEach(function(oneMovie){
                newSet.push(oneMovie)})
                _this.setState({
                    res:newSet
                })
            }}
            else {
                _this.setState({
                    res:new Array()
                })
            }
        })
}

  render() {
    return (
    <div className={cx('resultsDiv')}>

    <ResultList result={this.state.res}/>

    </div>
  );
  }
}
export default SearchResults;
