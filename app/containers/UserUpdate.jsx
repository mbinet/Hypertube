import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from '../css/components/film';
const cx = classNames.bind(styles);
import { Card, Layout, Button, Input} from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { Link } from 'react-router';
import update from 'react-addons-update';
import axios from 'axios';

class Film extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                username: "",
                firstname: "",
                lastname: "",
                email: ""
            },
        };
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            user: update(this.state.user, {
                username: { $set: nextProps.user.profile.username },
                firstname: { $set: nextProps.user.profile.firstname },
                lastname: { $set: nextProps.user.profile.lastname },
                email: { $set: nextProps.user.email }
            })
        })
        console.log(nextProps.user)
    }

    handleSubmit() {
        // if (this.state.user.username && this.state.user.firstname && this.state.user.lastname && this.state.user.email) {
        console.log("hey")
            axios.post('/api/updateUser/', {
                userId: this.props.user._id,
                username: this.state.user.username,
                firstname: this.state.user.firstname,
                lastname: this.state.user.lastname,
                email: this.state.user.email
            }).then(function (response) {
                console.log(response.data.msg);
            })
        // }
    }

    handleChange(e) {
        this.setState({
            user: update(this.state.user, {[e.target.name]: {$set: e.target.value}})
        })
    }

    render() {

        // checking if user is connected
        if (this.props.cookieUser._id == this.props.user._id) {
            return (
                <Layout style={{backgroundColor: 'white'}}>
                    <Content style={{margin: 'auto'}}>
                        <Card style={{width: 300}}>
                            <div className={cx('custom-image')}>
                                <img alt="example" width="100%" src={this.props.user.profile.picture}/>
                            </div>
                            <div className={cx('custom-card')}>
                                <div style={{ textAlign: 'center' }}>
                                Username
                                <Input type="text"
                                       name="username"
                                       placeholder="username"
                                       value={this.state.user.username}
                                       onChange={this.handleChange.bind(this)}
                                       style={{ marginLeft: 0 }}
                                />
                                Firstname
                                <Input type="text"
                                       name="firstname"
                                       placeholder="firstname"
                                       value={this.state.user.firstname}
                                       onChange={this.handleChange.bind(this)}
                                       style={{ marginLeft: 0 }}
                                />
                                Lastname
                                <Input type="text"
                                       name="lastname"
                                       placeholder="lastname"
                                       value={this.state.user.lastname}
                                       onChange={this.handleChange.bind(this)}
                                       style={{ marginLeft: 0 }}
                                />
                                Email
                                <Input type="email"
                                       name="email"
                                       placeholder="email"
                                       value={this.state.user.email}
                                       onChange={this.handleChange.bind(this)}
                                       style={{ marginLeft: 0 }}
                                />
                                    <Button
                                        type='primary'
                                        className={cx('button')}
                                        onClick={() => this.componentWillReceiveProps(this.props)}
                                        style={{ width: 100 }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type='primary'
                                        className={cx('button')}
                                        onClick={() => this.handleSubmit()}
                                        style={{ width: 100, marginLeft: 10 }}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </Content>
                </Layout>
            )
        }
        else {
            return (
                <div>
                    You should not be here
                </div>
            )
        }
    }
}

export default Film;
