import React from 'react';
import MovieVignet from './MovieVignet'
import classNames from 'classnames/bind';
import styles from '../css/components/movieList';
import lang from '../utils/lang'
import en from '../../locale-data/en.json';
import fr from '../../locale-data/fr.json';

const cx = classNames.bind(styles);

function HasResult(props){
    var trad;
    trad = lang() == 'fr' ? fr : en
    if (!props || !props.list || props.list.length == 0)
    {
        // console.log('resultList --- hasresult: no result')
        return (<p>{trad.nomovie}</p>)
    }
    // console.log('resultList --- hasresult', props.list.length)
    return (
        <div className={cx('movieListDiv')}> {
            props.list.map(function(oneMovie, i){
            return <MovieVignet key={i + 1} movie={oneMovie}/>
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
