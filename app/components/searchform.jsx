import React from 'react';
import SelectInput from './selectInput'
import SearchResults from './searchResults'
import classNames from 'classnames/bind';
import styles from '../css/components/searchForm';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios'

const cx = classNames.bind(styles);
/**
 * search bar
 */
class SearchForm extends React.Component {
  constructor() {
    super();
    this.state = {
      query_term: "",
      genre: "",
      minRating: "0",
      rtRating: "false",
      sortBy: "date",
      orderBy:"desc",
      quality:"720p",
      maxPage:0,
      page:0,
      url:"",
      newSearch:true
  };
}
    YUrlGen(e){
        var url = "https://yts.ag/api/v2/list_movies.json?"
        var sortBy = ""

        if (this.state.sortBy)
            var sortBy = "sort_by="+this.state.sortBy
        if (this.state.query_term)
            var query = "&query_term="+this.state.query_term
        else
            var query=""
        if (this.state.minRating)
            var minRating = "&minimum_rating="+this.state.minRating
        else {
            var minRating = ""
        }
        if (this.state.quality)
            var quality = "&quality="+this.state.quality
        else {
            var quality = ""
        }
        if (this.state.genre)
            var genre = "&genre="+this.state.genre
        else {
            var genre = ""
        }
        if (this.state.orderBy)
            var orderBy = "&order_by="+this.state.orderBy
        else {
            var orderBy = ""
        }
        if (this.state.rtRatings)
            var rtRatings = "&with_rt_ratings="+this.state.rtRatings
        else {
            var rtRatings = ""
        }
        var url = url + sortBy + query +genre + minRating + quality + orderBy + rtRatings + "&limit=20&page=" + this.state.page
        this.setState({url:url, newSearch:true, page:0}, function(){
            this.maxPages()
        // this.maxPages()
        console.log("searchForm --- search hit",this.state)})
        e.preventDefault()
    }

   maxPages(){
       var _this = this
       this.serverRequest =
        axios
            .get(this.state.url)
            .then(function(result){
                var nMovies = result.data.data.movie_count
                var maxPage = Math.ceil(nMovies/20) - 1
                console.warn("searchForm --- maxpages=", maxPage)
                _this.setState({
                    maxPage: maxPage
                })
            })
   }
   loadMore(){
       var pageNum = this.state.page + 1;
       var url = this.state.url.toString();
       var newUrl = url.replace(/(page=[\w]+)$/, "page=" + pageNum);
       console.log('searcForm --- load page', pageNum);
       this.setState({url: newUrl, page:pageNum, newSearch:false});
   }

   handleChange(event){
       this.setState({[event.target.name]: event.target.value})
   }

  render() {
      var hasMoreBool = this.state.page >= this.state.maxPage ? false:true
    //   console.log("hasmore=",hasMoreBool)
    return (
        <div>
      <form className={cx('searchForm')} id="searchForm" onSubmit={this.YUrlGen.bind(this)}>
      <input onChange={this.handleChange.bind(this)} value={this.state.query_term} type="text" placeholder="keyword" name="query_term"/>
      <input onChange={this.handleChange.bind(this)} value={this.state.genre} type="text" placeholder="genre" name="genre"/>
      <SelectInput name="sortBy" editValue={this.handleChange.bind(this)} values={['date', 'year', 'rating', 'peers', 'seeds', 'downloads', 'likes', 'title']}/>
      <SelectInput name="orderBy" editValue={this.handleChange.bind(this)} values={['desc', 'asc']}/>
      <SelectInput name="quality" editValue={this.handleChange.bind(this)} values={['720p', '1080p', '3D']}/>
      <SelectInput name="minRating" editValue={this.handleChange.bind(this)} values={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}/>
      <SelectInput name="rtRating" editValue={this.handleChange.bind(this)} values={['no', 'yes']}/>
      <input type="submit" value="search"/>
      </form>
      <h2> results: </h2>
      <h3>{this.props.url}</h3>
      <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMore.bind(this)}
          hasMore={hasMoreBool}
          initialLoad={false}
          loader={<div className={cx('loader')}></div>}
      >
        <SearchResults url={this.state.url} page={this.state.page} maxPage={this.state.maxPage} newSearch={this.state.newSearch}/>
        </InfiniteScroll>
      </div>
  );
  }
}
export default SearchForm;
