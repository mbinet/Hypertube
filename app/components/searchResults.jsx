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
        page: this.props.page,
        maxPage: this.props.maxPage
    }
}

componentWillReceiveProps(nextProps) {
    var _this = this;
    this.setState({page:nextProps.page, maxPage:nextProps.maxPage})
    console.warn("searchresult state", this.state.page, this.state.maxPage)
    if (nextProps.newSearch == true)
        this.setState({res:new Array(), page:nextProps.page, maxPage:nextProps.maxPage})
    if (this.props.url != nextProps.url){
    this.serverRequest =
      axios
        .get(this.props.url)
        .then(function(result) {
        if (result.data.data.movies && _this.state.page <= _this.state.maxPage)
        {
            if (!_this.state.res || _this.state.res == null){
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
        })
    }
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
