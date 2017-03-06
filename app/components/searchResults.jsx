import React from 'react';
import axios from 'axios'
import ResultList from './ResultList'

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

componentWillUnmount() {
   this.serverRequest.abort();
 }

  render() {
    return (
    <div>
    <h2> results: </h2>
    <h2>{this.props.url}</h2>
    <ResultList result={this.state.res}/>
    </div>
  );
  }
}
export default SearchResults;
