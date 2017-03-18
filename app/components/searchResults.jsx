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

/** Get Movies data **/

getResult(){
    var _this = this;
    this.serverRequest =
    axios
    .get(this.state.url)
    .then(function(result) {
        if (result.data && result.data.data && result.data.data.movies && _this.state.page <= _this.state.maxPage)
        {
            if (!_this.state.res || _this.state.res == null || _this.state.res == []){
                console.log("searchRsults --- no previous result", _this.state.res)
                console.log("searchRsults --- result to add :", result.data.data.movies.length)
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

/** listen to changes in props */

componentWillReceiveProps(nextProps) {
    console.warn("new props", nextProps)
    this.setState({page:nextProps.page, maxPage:nextProps.maxPage})
    if (nextProps.newSearch == true){
        console.log("searcRresult --- newsearch")
        this.setState({res:new Array(), page:nextProps.page, maxPage:nextProps.maxPage, url:nextProps.url}, function(){this.getResult()})
    }
    else if (this.state.url != nextProps.url){

        console.log("searchResults --- old", this.state.url, "new", nextProps.url)
        this.setState({url:nextProps.url}, function(){this.getResult()})
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
