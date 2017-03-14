import React from 'react';
import MovieVignet from './MovieVignet'
import classNames from 'classnames/bind';
import styles from '../css/components/movieList';

const cx = classNames.bind(styles);

function HasResult(props){
    if (!props || !props.list || props.list.length == 0)
    {
        console.log('resultList --- hasresult: no result')
        return (<p> No movies </p>)
    }
    console.log('resultList --- hasresult', props.list.length)
    return (
        <div className={cx('movieListDiv')}> {
            props.list.map(function(oneMovie){
            return <MovieVignet movie={oneMovie}/>
        })}
        </div>
    )
}

class ResultList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            result:this.props.result,
        }
    }
    render(){
        var result = this.props.result
        return(<div className={cx('movieList')}>
            <HasResult list={result}/>
            </div>
    )
    }
}
export default ResultList;
