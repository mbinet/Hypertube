import React, { Component } from 'react';
import Video from "react-h5-video";
import MovieBox from '../components/MovieBox';

class Film extends Component {

    render() {
        return (
            <div>
                title : <h1>  {this.props.title} </h1>
                rating : <h1>  {this.props.rating} </h1>
                genres : <h1>  {this.props.genres} </h1>
                synopsis : <h1>  {this.props.synopsis} </h1>
                language : <h1>  {this.props.language} </h1>
                <MovieBox subFr={this.props.subFr} subEn={this.props.subEn} idImdb={this.props.idImdb}/>
            </div>
        )
    }
}

export default Film;
