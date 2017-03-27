import React, { Component } from 'react';
import Video from "react-h5-video";
import MovieBox from '../components/MovieBox';
import CommentBox from '../components/CommentBox';
import styles from '../css/components/film';
import classNames from 'classnames/bind';
import StarRatingComponent from 'react-star-rating-component';
import lightDown from '../images/lightdown.svg'
import lightUp from '../images/lightup.svg'
import en1 from '../../locale-data/en.json';
import fr1 from '../../locale-data/fr.json';

const cx = classNames.bind(styles);

var trad;
// if (window.locale != 'fr') {
//     trad = en1.navigation
// }
// else {
    trad = fr1.movie;
// }

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
            // console.log("response data",this.props)
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
                        <p>genres</p>
                        <div><GetGenres genresList={genres}/></div>
                        <p>{trad.year}</p>
                        <h2>{this.props.year}</h2>
                        <p>{trad.language}</p> <h2>  {this.props.language} </h2>
                        <img onClick={this.toggleLight.bind(this)} className={cx('light')} src={backgroundImage}/>
                    </div>
                    <div className={cx('rightInfo')}>
                        <p>synopsis </p> <h3 className={cx('synopsis')}>  {this.props.synopsis} </h3>
                        <p>{trad.runtime}</p> <h3 className={cx('synopsis')}>  {this.props.runtime} min </h3>
                        <p>{trad.mparating}</p> <h3 className={cx('synopsis')}>  {this.props.mparating}</h3>
                    </div>
                </div>
                <MovieBox subFr={this.props.subFr} subEn={this.props.subEn} idImdb={this.props.idImdb}/>
                <CommentBox idImdb={this.props.idImdb} />
            </div>
        )
    }
}

export default Film;
