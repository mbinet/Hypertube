import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from '../css/components/user';
const cx = classNames.bind(styles);
import { Card, Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

class Film extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Layout style={{ backgroundColor: 'white'}}>
                <Content style={{ margin: 'auto' }}>
                    <Card style={{ width: 300 }} bodyStyle={{ padding: 0 }} >
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
                </Content>
            </Layout>
        )
    }
}

export default Film;
