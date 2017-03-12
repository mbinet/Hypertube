import React from 'react'
import classNames from 'classnames/bind';
import styles from '../css/components/movieCard';
import StarRatingComponent from 'react-star-rating-component';
import { Link } from 'react-router';

const cx = classNames.bind(styles);

class MovieVignet extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        var movieLink = "/film/" + this.props.movie.imdb_code
        var backgroundImage = "url("+ this.props.movie.large_cover_image + ")"
    return(
        <Link to={movieLink} className={cx('cardLink')}>
        <div className={cx('movieCard')} style={{backgroundImage: backgroundImage}}>
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
            <p><br/>peers / seeds:<br/>{this.props.movie.torrents[0].peers} / {this.props.movie.torrents[0].seeds}</p>
            <p className={cx('shortSummary')}><br/>{this.props.movie.summary}</p>
        </div>
        </div>
      </Link>
    )
}
}
export default MovieVignet;
