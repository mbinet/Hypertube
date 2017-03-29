import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from '../css/components/user';
const cx = classNames.bind(styles);
import { Card, Layout, Button } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { Link } from 'react-router';
import en1 from '../../locale-data/en.json';
import fr1 from '../../locale-data/fr.json';
import lang from '../utils/lang'


var trad;
trad = lang() == 'fr' ? fr1 : en1

class Film extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        var btn = ""
        if (this.props.user && this.props.cookieUser._id == this.props.user._id) {
            btn = <Link to={ '/user/' + this.props.user._id + '/update' }><Button type='primary' className={cx('button')} style={{ width: 100, marginBottom: 30, textAlign: 'center' }}>{trad.updatelol}</Button></Link>
        }
        var username = "user not found"
        var firstname = ""
        var lastname = ""
        var imgsrc="https://uos.edu.pk/assets/backend/images/staff/imagenotfound.svg"

        if (this.props && this.props.user){
            var username = this.props.user.profile.username
            var firstname = this.props.user.profile.firstname
            var lastname = this.props.user.profile.lastname
            var imgsrc = this.props.user.profile.picture
        }
        return (
            <Layout style={{ backgroundColor: 'white'}}>
                <Content style={{ margin: 'auto' }}>
                    <Card style={{ width: 250 }} bodyStyle={{ padding: 0 }} >
                        <div className={cx('custom-image')}>
                            <img alt="example" width="100%" src={imgsrc} />
                        </div>
                        <div className={cx('custom-card')}>
                            <h3>{username}</h3>
                            <p>{firstname}</p>
                            <p>{lastname}</p>
                        </div>
                    </Card>
                    <div style={{ textAlign: 'center', marginTop: 20 }}>{btn}</div>
                </Content>
            </Layout>
        )
    }
}

export default Film;
