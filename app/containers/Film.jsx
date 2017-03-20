import React, { Component } from 'react';
import Video from "react-h5-video";
import MovieBox from '../components/MovieBox';
import styles from '../css/components/film';
import classNames from 'classnames/bind';
import StarRatingComponent from 'react-star-rating-component';
import lightDown from '../images/lightdown.svg'
import lightUp from '../images/lightup.svg'

const cx = classNames.bind(styles);

function GetGenres(props){
    if (props.genresList){
    var genresArray = props.genresList
    return (<div>{Object.keys(genresArray).map(function (key){
        return (<span key={key + 1} className={cx('genres')}>{genresArray[key] + " "}</span>)
    })}</div>)
}
else {
    {
        return <span></span>
    }
}
}

class Film extends Component {
    constructor(props) {
        super(props)
        this.state = {
            light:true
        }
    }

    toggleLight(){
        this.setState({
            light: !this.state.light
        })
    }
    render() {
            var backgroundImage = "url("+ this.props.img + ")"
            var genres = this.props.genres
            var backgroundImage = this.state.light?lightDown:lightUp
            var backgroundColor = this.state.light?'white':'#3f4144'
            var nightMode = this.state.light?'':'Night'
        return (
            <div className={cx('filmContainer'+nightMode)} style={{backgroundColor: backgroundColor}}>
                <h1 className={cx('title'+nightMode)}>  {this.props.title} </h1>
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
                        <p>genres </p>
                        <div><GetGenres genresList={genres}/></div>
                        <p>language </p> <h2>  {this.props.language} </h2>
                        <img onClick={this.toggleLight.bind(this)} className={cx('light')} src={backgroundImage}/>
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
