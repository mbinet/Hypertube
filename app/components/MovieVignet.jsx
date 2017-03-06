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
    return(
        <Card style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
        <div className="custom-image">
          <img alt={this.props.movie.title} width="100%" src={this.props.movie.large_cover_image }/>
        </div>
        <div className="custom-card">
          <h3>{this.props.movie.title}</h3>
          <p>{this.props.movie.year}</p>
        </div>
      </Card>
    )
}
}
export default MovieVignet;
