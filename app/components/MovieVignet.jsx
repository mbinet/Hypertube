import React from 'react'
import classNames from 'classnames/bind';
import styles from '../css/components/movieCard';
import { Card } from 'antd';

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
        var movieLink = "/film/" + this.props.movie.imdb_code
    return(
        <a href={movieLink} className={cx('cardLink')}><Card style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
        <div className=("custom-image")>
          <img alt={this.props.movie.title} width="100%" src={this.props.movie.large_cover_image }/>
        </div>
        <div className={cx('cardInfo')}>
          <h3>{this.props.movie.title}</h3>
          <p>{this.props.movie.year}</p>
        </div>
      </Card></a>
    )
}
}
export default MovieVignet;
