import en from '../../locale-data/en.json';
import fr from '../../locale-data/fr.json';

import React from 'react';
import SelectInput from './selectInput'
import SearchResults from './searchResults'
import classNames from 'classnames/bind';
import styles from '../css/components/searchForm';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import lang from '../utils/lang'


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
      page:1,
      url:"",
      newSearch:true
  };
}

componentDidMount(){
    this.setState({
        url:"https://yts.ag/api/v2/list_movies.json?minimum_rating=8&sort_by=rating&order_by=desc&page=0",
        page:1,
        maxPage:15
    })
}
/**
    Generate URl for API request
**/
    YUrlGen(){
        var url = "https://yts.ag/api/v2/list_movies.json?"
        var sortBy = ""
        if (this.state.sortBy)
            var sortBy = "sort_by="+this.state.sortBy
        if (this.state.query_term && !this.state.query_term.match(/'(\s)*(or).*=.*/))
        {console.log("ca passe ouil faut pas")
            var query = "&query_term="+this.state.query_term}
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
        if (this.state.genre && !this.state.genre.match(/'(\s)*(or).*=.*/))
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
        return (url)
    }

/** check max number of pages */
   maxPages(e){
       e.preventDefault()
       this.setState({page:0, newSearch:true}, function(){
       var url = this.YUrlGen()
       // console.log("url in searchForm maxPages", url)
       var _this = this
       if (this.state.genre.match(/'(\s)*(or).*=.*/) || this.state.query_term.match(/'(\s)*(or).*=.*/))
       {
           url = "https://yts.ag/api/v2/list_movies.json?query_term=ueasdfymhajsoeidlfjoads&minimum_rating=8&sort_by=rating&order_by=desc&page=0"
       }
       this.serverRequest =
        axios
            .get(url)
            .then(function(result){
                if (result.data && result.data.data){
                var nMovies = result.data.data.movie_count
                var maxPage = Math.ceil(nMovies/20)
                // console.warn("searchForm --- maxpages=", maxPage, "movies=", nMovies)
                _this.setState({
                    maxPage: maxPage,
                    url: url,
                    page:1,
                    newSearch:true
                }, function(){
                    // console.warn("state on search click", _this.state)
                })}
            })
        })
   }

 /** load next page **/

   loadMore(){
       var pageNum = this.state.page + 1;
       var url = this.state.url.toString();
       var newUrl = url.replace(/(page=[\w]+)$/, "page=" + pageNum);
       // console.log('searcForm --- load page', pageNum);
       this.setState({url: newUrl, page:pageNum, newSearch:false});
   }

/*listen to changes in inputs, put them in states */

   handleChange(event){
       this.setState({[event.target.name]: event.target.value})
   }

    render() {
        var hasMoreBool = this.state.page >= this.state.maxPage ? false:true
        var trad;
        trad = lang() == 'fr' ? fr : en
        return (
            <div>
                <form className={cx('searchForm')} id="searchForm" onSubmit={this.maxPages.bind(this)}>
                    <input onChange={this.handleChange.bind(this)} value={this.state.query_term} type="text" placeholder={trad.keyword} name="query_term"/>
                    <input onChange={this.handleChange.bind(this)} value={this.state.genre} type="text" placeholder={trad.genre} name="genre"/>
                    <SelectInput text={trad.sortBy} name="sortBy" editValue={this.handleChange.bind(this)} values={['date', 'year', 'rating', 'peers', 'seeds', 'downloads', 'likes', 'title']}/>
                    <SelectInput text={trad.orderBy} name="orderBy" editValue={this.handleChange.bind(this)} values={['desc', 'asc']}/>
                    <SelectInput text={trad.quality} name="quality" editValue={this.handleChange.bind(this)} values={['720p', '1080p', '3D']}/>
                    <SelectInput text={trad.minRating} name="minRating" editValue={this.handleChange.bind(this)} values={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}/>
                    <input type="submit" value={trad.search}/>
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
