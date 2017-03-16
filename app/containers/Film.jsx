import React, { Component } from 'react';
import Video from "react-h5-video";
import MovieBox from '../components/MovieBox';

class Film extends Component {

    render() {
        return (
            <div>
                <h1> {this.props.title} </h1>
                <MovieBox subFr={this.props.params.subFr} subEn={this.props.params.subEn} idImdb={this.props.params.idImdb}/>
            </div>
        )
    }
}

export default Film;
