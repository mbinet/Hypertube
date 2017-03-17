import React, { Component } from 'react';
import Video from "react-h5-video";
import MovieBox from '../components/MovieBox';
import styles from '../css/components/film';
import classNames from 'classnames/bind';
import StarRatingComponent from 'react-star-rating-component';

const cx = classNames.bind(styles);

function getGenres(props){
    console.log("genres",props)
    if (!props || !props.list || props.list.length == 0)
    {
        console.log('resultList --- hasresult: no result')
        return (<p> No Genre </p>)
    }
    console.log('resultList --- hasresult', props.list.length)
    return (
        <div> {
            props.list.forEach(function(genre){
            return (<p>{genre}</p>)
        })}
        </div>
    )
}

class Film extends Component {

    render() {
            var backgroundImage = "url("+ this.props.img + ")"
        return (
            <div className={cx('filmContainer')}>
                <h1 className={cx('title')}>  {this.props.title} </h1>
                <div className={cx('infos')}>
                    <div className={cx('leftInfo')}>
                        <p className={cx('rating')}>  {this.props.rating} </p>
                        <StarRatingComponent
                        name=""
                        value={parseFloat(this.props.rating)}
                        starCount={10}
                        editing={false}
                        emptyStarColor= {'#d5d5d5'}
                        />
                        <p>genres </p><h2> {this.props.genres} </h2>
                        <getGenres list={this.props.genres}/>
                        <p>language </p> <h2>  {this.props.language} </h2>
                    </div>
                    <div className={cx('rightInfo')}>
                        <p>synopsis </p> <h3 className={cx('synopsis')}>  {this.props.synopsis} </h3>
                    </div>
                </div>
                <MovieBox subFr={this.props.subFr} subEn={this.props.subEn} idImdb={this.props.idImdb}/>
            </div>
        )
    }
}

export default Film;
