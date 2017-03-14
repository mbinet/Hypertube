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
        maxPage: this.props.maxPage,
        url:this.props.url
    }
}

getResult(){
    var _this = this;
    this.serverRequest =
    axios
    .get(this.props.url)
    .then(function(result) {
        if (result.data.data.movies && _this.state.page <= _this.state.maxPage)
        {
            if (!_this.state.res || _this.state.res == null){
                console.log("searchRsults --- no previous result", _this.state.res)
                console.log("searchRsults --- result to add :", result.data.data.movie_count)
                _this.setState({
                    res: result.data.data.movies
                });}
                else{
                    console.log("searchRsults --- previous result :", _this.state.res)
                    console.log("searchRsults --- result to add :", result.data.data.movies.length)
                    var newSet = _this.state.res
                    result.data.data.movies.forEach(function(oneMovie){
                        newSet.push(oneMovie)})
                        _this.setState({
                            res:newSet
                        })
                    }}
                })
}

componentWillReceiveProps(nextProps) {
    this.setState({page:nextProps.page, maxPage:nextProps.maxPage})
    console.log("searchResults --- willReceiveProps url to search", this.state.url)
    if (nextProps.newSearch == true){
        console.log("searcRresult --- newsearch")
        this.setState({res:new Array(), page:nextProps.page, maxPage:nextProps.maxPage})
    }
    if (this.state.url != nextProps.url){
        console.log("searchResults --- old", this.state.url, "new", nextProps.url)
        this.getResult()
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
