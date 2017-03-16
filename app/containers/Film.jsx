import React, { Component } from 'react';
import Video from "react-h5-video";
import MovieBox from '../components/MovieBox';

class Film extends Component {

    render() {
        return (
            <div>
                <h1> {this.props.title} </h1>
                <MovieBox subFr={this.props.subFr} subEn={this.props.subEn} idImdb={this.props.idImdb}/>
            </div>
        )
    }
}

export default Film;
