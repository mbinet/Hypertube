import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from '../css/components/user';
const cx = classNames.bind(styles);
import { Card, Layout, Button } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { Link } from 'react-router';

class AllUsers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: props.allUsers,
        }
        console.log("component props", props.allUsers, typeof props.allUsers)
    }

componentWillReceiveProps(nextProps)  {
        var result = JSON.parse(nextProps.allUsers)
        console.log("nextprops", result)
        this.setState({users: result})
    }

    usersList (){
        if (this.state.users){
            this.state.users.forEach(user => {
                return( <div>
                    <p>user</p>
                    <p>{user.email}</p>
                </div>)
            })
        }
    }
    render() {
        return (
            <userList />
        )
    }
}

export default AllUsers;
