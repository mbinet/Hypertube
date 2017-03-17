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
      sortBy: "date",
      orderBy:"desc",
      quality:"720p",
      maxPage:0,
      page:0,
      url:"",
      newSearch:true
  };
}

/**
    Generate URl for API request
**/
    YUrlGen(){
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
        var url = url + sortBy + query +genre + minRating + quality + orderBy + "&limit=20&page=" + this.state.page
        // var _this = this
        // this.setState({url:url, newSearch:true, page:0}, function(){
            // _this.maxPages()
        // console.log("searchForm --- search hit",this.state)})
        return (url)
    }

/** check max number of pages */
   maxPages(e){
       e.preventDefault()
       var url = this.YUrlGen()
       console.log("url in searchForm maxPages", url)
       var _this = this
       this.serverRequest =
        axios
            .get(url)
            .then(function(result){
                if (result.data && result.data.data){
                var nMovies = result.data.data.movie_count
                var maxPage = Math.ceil(nMovies/20) - 1
                console.warn("searchForm --- maxpages=", maxPage, "movies=", nMovies)
                _this.setState({
                    maxPage: maxPage,
                    url: url,
                    page: 0,
                    newSearch:true
                }, function(){
                    console.log("state on search click", _this.state)
                })
            }
            })
   }

 /** load next page **/

   loadMore(){
       var pageNum = this.state.page + 1;
       var url = this.state.url.toString();
       var newUrl = url.replace(/(page=[\w]+)$/, "page=" + pageNum);
       console.log('searcForm --- load page', pageNum);
       this.setState({url: newUrl, page:pageNum, newSearch:false});
   }

/*listen to changes in inputs, put them in states */

   handleChange(event){
       this.setState({[event.target.name]: event.target.value})
   }

  render() {
      var hasMoreBool = this.state.page >= this.state.maxPage ? false:true
    return (
        <div>
      <form className={cx('searchForm')} id="searchForm" onSubmit={this.maxPages.bind(this)}>
      <input onChange={this.handleChange.bind(this)} value={this.state.query_term} type="text" placeholder="keyword" name="query_term"/>
      <input onChange={this.handleChange.bind(this)} value={this.state.genre} type="text" placeholder="genre" name="genre"/>
      <SelectInput name="sortBy" editValue={this.handleChange.bind(this)} values={['date', 'year', 'rating', 'peers', 'seeds', 'downloads', 'likes', 'title']}/>
      <SelectInput name="orderBy" editValue={this.handleChange.bind(this)} values={['desc', 'asc']}/>
      <SelectInput name="quality" editValue={this.handleChange.bind(this)} values={['720p', '1080p', '3D']}/>
      <SelectInput name="minRating" editValue={this.handleChange.bind(this)} values={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}/>
      <input type="submit" value="search"/>
      </form>
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
