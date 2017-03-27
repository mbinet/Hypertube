import React from 'react'
import classNames from 'classnames/bind';
import styles from '../css/components/movieCard';
import StarRatingComponent from 'react-star-rating-component';
import { Link } from 'react-router';
import cookie from 'react-cookie'
import en1 from '../../locale-data/en.json';
import fr1 from '../../locale-data/fr.json';

const cx = classNames.bind(styles);

class MovieVignet extends React.Component {
    constructor(props){
        super(props)
    }
    render(){

        var userCookie;
        var seen_str = "";
        var viewedStyle = "none"
        var trad;
        // if (window.locale != 'fr') {
        //     trad = en1.navigation
        // }
        // else {
            trad = en1
        // }
        if (userCookie = cookie.load('user')) {
            if (userCookie[0] == 'j') {
                userCookie = userCookie.substr(2)
                userCookie = JSON.parse(userCookie)
            }
            if (userCookie.profile.seen) {
                if (userCookie.profile.seen.indexOf(this.props.movie.imdb_code) != -1) {
                    seen_str = <p>{trad.viewed}</p>
                    viewedStyle='inset 0 0 150px white'
                }
            }
        }

        var movieLink = "/film/" + this.props.movie.imdb_code
        var backgroundImage = "url("+ this.props.movie.large_cover_image + ")"
    return(
        <Link to={movieLink} className={cx('cardLink')}>
        <div className={cx('movieCard')} style={{backgroundImage: backgroundImage, boxShadow: viewedStyle}}>
        <div className={cx('cardInfo')}>
          <h3>{this.props.movie.title}</h3>
          <p>{this.props.movie.year}</p>
          <StarRatingComponent
            name=""
            value={this.props.movie.rating}
            starCount={10}
            editing={false}
            emptyStarColor= {'#fff'}
            />
            {seen_str}
            <p><br/>peers / seeds:<br/>{this.props.movie.torrents[0].peers} / {this.props.movie.torrents[0].seeds}</p>
            <p className={cx('shortSummary')}><br/>{this.props.movie.summary}</p>
        </div>
        </div>
      </Link>
    )
}
}
export default MovieVignet;
