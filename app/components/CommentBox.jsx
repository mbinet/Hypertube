import axios from 'axios';
import React from 'react';
import en1 from '../../locale-data/en.json';
import fr1 from '../../locale-data/fr.json';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl';
import { Table, Icon, Card, Input, Button } from 'antd';
import cookie from 'react-cookie';
import { Link } from 'react-router';
addLocaleData([...en, ...fr]);
import styles from '../css/components/film'
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

/**
 * A counter button: tap the button to increase the count.
 */
class CommentBox extends React.Component {
    constructor() {
        super();
        this.state = {
            comment: "",
            comments: [],
        };
    }

    componentWillMount() {
        this.getComments(this.props.idImdb)
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }

    onSubmit() {
        var user = cookie.load('user')
        if (user[0] == 'j') {
            user = user.substr(2)
            user = JSON.parse(user)
        }
        var that = this

        if (this.state.comment != "") {
            axios.post('/api/addComment/', {
                userId: user._id,
                videoId: this.props.idImdb,
                msg: this.state.comment
            }).then(function (response) {
                // console.log(response.data.message);
                that.getComments(that.props.idImdb)
            })
            this.setState({
                comment: ""
            })
        }
    }

    getComments(idImdb) {
        axios.get('/api/getComments/' + idImdb)
            .then((response) => {
                    // console.log(response.data.comments)
                    this.setState({
                        comments: response.data.comments
                    })
                }
            )
    }

    render() {
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 100
        }, {
            title: 'Comment',
            dataIndex: 'comment',
            key: 'comment',
            width: 500
        }];
        const data = [];

        var comments = this.state.comments
        comments.forEach(function (doc, err) {
            data.push({
                name: <Link to={ '/user/' + doc.userId }>{doc.userName}</Link>,
                comment: doc.msg,
                key: doc._id
            })
            // console.log(doc)
        })

        var tab = fr1
        return (
            <IntlProvider locale='fr' messages={fr1} >
                <div className={cx('commentBox')} style={{marginTop: 30}}>
                    <h1 className={cx('title')}>{tab.comments}</h1>
                        <div style={{marginBottom: 20 }} className={cx('inputContain')}>
                            <Input type="textarea"
                                    className={cx('input')}
                                   placeholder="Type your comment..."
                                   autosize={{ minRows: 2 }}
                                   style={{ display: 'inline-block', width: 650}}
                                   name="comment"
                                   value={this.state.comment}
                                   onChange={this.handleChange.bind(this)}
                            />
                        </div>
                        <Button type='primary' className={cx('button')} onClick={this.onSubmit.bind(this)} style={{ width: 100, marginBottom: 30  }}>Send</Button>
                        <Table columns={columns} dataSource={data} pagination={false} showHeader={false} size={'small'}/>
                </div>
            </IntlProvider>
        );
    }
}
export default CommentBox;
