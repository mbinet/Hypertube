import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from '../css/components/user';
const cx = classNames.bind(styles);
import { Card, Layout, Button } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { Link } from 'react-router';

class Film extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        var btn = ""
        if (this.props.cookieUser._id == this.props.user._id) {
            btn = <Link to={ '/user/' + this.props.user._id + '/update' }><Button type='primary' className={cx('button')} style={{ width: 100, marginBottom: 30, textAlign: 'center' }}>Update</Button></Link>
        }
        return (
            <Layout style={{ backgroundColor: 'white'}}>
                <Content style={{ margin: 'auto' }}>
                    <Card style={{ width: 250 }} bodyStyle={{ padding: 0 }} >
                        <div className={cx('custom-image')}>
                            <img alt="example" width="100%" src={this.props.user.profile.picture} />
                        </div>
                        <div className={cx('custom-card')}>
                            <h3>{this.props.user.profile.username}</h3>
                            <p>{this.props.user.profile.firstname}</p>
                            <p>{this.props.user.profile.lastname}</p>
                            <p>{this.props.user.email}</p>
                            <p>Card content</p>
                        </div>
                    </Card>
                    <div style={{ textAlign: 'center', marginTop: 20 }}>{btn}</div>
                </Content>
            </Layout>
        )
    }
}

export default Film;
