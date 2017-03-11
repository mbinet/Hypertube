import React from 'react';
import SelectInput from './selectInput'
import SearchResults from './searchResults'
import classNames from 'classnames/bind';
import styles from '../css/components/searchForm';

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
      url:""
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
        var url = url + sortBy + query +genre + minRating + quality + orderBy + rtRatings + "&limit=50&page=0"
        this.setState({url:[url]})
        e.preventDefault()
    }

   handleChange(event){
       this.setState({[event.target.name]: event.target.value})
   }

  render() {
    return (
        <div>
      <form className={cx('searchForm')} id="searchForm" onSubmit={this.YUrlGen.bind(this)}>
      <input onChange={this.handleChange.bind(this)} type="text" value={this.state.query_term} placeholder="keyword" name="query_term"/>
      <input onChange={this.handleChange.bind(this)} type="text" value={this.state.genre} placeholder="genre" name="genre"/>
      <SelectInput name="sortBy" editValue={this.handleChange.bind(this)} values={['date', 'year', 'rating', 'peers', 'seeds', 'downloads', 'likes', 'title']}/>
      <SelectInput name="orderBy" editValue={this.handleChange.bind(this)} values={['desc', 'asc']}/>
      <SelectInput name="quality" editValue={this.handleChange.bind(this)} values={['720p', '1080p', '3D']}/>
      <SelectInput name="minRating" editValue={this.handleChange.bind(this)} values={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}/>
      <SelectInput name="rtRating" editValue={this.handleChange.bind(this)} values={['no', 'yes']}/>
      <input type="submit" value="search"/>
      </form>
      <SearchResults url={this.state.url} queries={this.state}/>
      </div>
  );
  }
}
export default SearchForm;
