import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from '../css/components/user';
const cx = classNames.bind(styles);
import { Card, Layout, Button } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { Link } from 'react-router';

function UserList(props){
    console.log(props)
    if (!props.users)
    {
        console.log('no users')
        return (<p> No users </p>)
    }
    return (
        <div className={cx('cards')}> {
            props.users.map(function(user, i){
                return (
                    <Card key={i+1} style={{ width: 200, margin:5 }} bodyStyle={{ padding: 0}} >
                        <div className={cx('custom-image')}>
                            <img alt="example" width="100%" src={user.profile.picture} />
                        </div>
                        <div className={cx('custom-card')}>
                            <h3>{user.profile.username}</h3>
                            <p>{user.profile.firstname}</p>
                            <p>{user.profile.lastname}</p>
                        </div>
                    </Card>
                )
            })}
            </div>
        )
    }

class AllUsers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: props.allUsers,
        }
    }

componentWillReceiveProps(nextProps)  {
        var result = JSON.parse(nextProps.allUsers)
        this.setState({users: result})
    }


    render() {
        var users = this.state.users
        return (
            <UserList users={users}/>
        )
    }
}

export default AllUsers;
