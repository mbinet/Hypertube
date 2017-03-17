import React, { Component } from 'react';
import Video from "react-h5-video";
import MovieBox from '../components/MovieBox';
import styles from '../css/components/film';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class Film extends Component {

    render() {
            console.log(this.props)
        return (
            <div className={cx('filmContainer')}>
                <h1 className={cx('title')}>  {this.props.title} </h1>
                rating : <h1>  {this.props.rating} </h1>
                genres : <h2>  {this.props.genres} </h2>
                synopsis : <h3 className={cx('synopsis')}>  {this.props.synopsis} </h3>
                language : <h2>  {this.props.language} </h2>
                <MovieBox subFr={this.props.subFr} subEn={this.props.subEn} idImdb={this.props.idImdb}/>
            </div>
        )
    }
}

export default Film;
