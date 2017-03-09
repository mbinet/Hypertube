import React from 'react'
import classNames from 'classnames/bind';
import styles from '../css/components/movieCard';

const cx = classNames.bind(styles);

class MovieVignet extends React.Component {
    constructor(props){
        super(props)
        console.log("props=", props )
    }
    omponentDidMount(){
        console.log("comp didnt mount")
    }
    render(){
        var movieLink = "api/film/" + this.props.movie.imdb_code
        var backgroundImage = "url("+ this.props.movie.large_cover_image + ")"
    return(
        <a href={movieLink} className={cx('cardLink')}>
        <div className={cx('movieCard')} style={{backgroundImage: backgroundImage}}>
        <div className={cx('cardInfo')}>
          <h3>{this.props.movie.title}</h3>
          <p>{this.props.movie.year}</p>
        </div>
        </div>
      </a>
    )
}
}
export default MovieVignet;
