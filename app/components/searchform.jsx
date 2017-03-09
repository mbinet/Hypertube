import React from 'react';
import SelectInput from './selectinput'
import SearchResults from './SearchResults'

/**
 * A counter button: tap the button to increase the count.
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
      <form id="searchForm" onSubmit={this.YUrlGen.bind(this)}>
      <input onChange={this.handleChange.bind(this)} type="text" value={this.state.query_term} placeholder="keyword" name="query_term"/>
      <input onChange={this.handleChange.bind(this)} type="text" value={this.state.genre} placeholder="genre" name="genre"/>
      <SelectInput onChange={this.handleChange.bind(this)} name="sortBy" values={['title', 'year', 'rating', 'peers', 'seeds', 'downloads', 'likes', 'date']}/>
      <SelectInput onChange={this.handleChange.bind(this)} name="orderBy" values={['desc', 'asc']}/>
      <SelectInput onChange={this.handleChange.bind(this)} name="quality" values={['720p', '1080p', '3D']}/>
      <SelectInput onChange={this.handleChange.bind(this)} name="minRating" values={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}/>
      <SelectInput onChange={this.handleChange.bind(this)} name="rtRating" values={['no', 'yes']}/>
      <input type="submit" value="search"/>
      </form>
      <SearchResults url={this.state.url} />
      </div>
  );
  }
}
export default SearchForm;
