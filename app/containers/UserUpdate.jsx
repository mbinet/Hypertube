import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from '../css/components/user';
import Dropzone from 'react-dropzone';

const cx = classNames.bind(styles);
import { Menu, Dropdown, Icon, Card, Layout, Button, Input} from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { Link } from 'react-router';
import update from 'react-addons-update';
import axios from 'axios';
import cookie from 'react-cookie';
import {browserHistory} from 'react-router';
import en1 from '../../locale-data/en.json';
import fr1 from '../../locale-data/fr.json';
import lang from '../utils/lang'

var trad;
trad = lang() == 'fr' ? fr1.login : en1.login

class Film extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imgPreview: '',
            user: {
                username: "",
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                lang: ""
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
                email: { $set: nextProps.user.email },
                password: {$set: nextProps.user.password},
                lang: { $set: nextProps.user.profile.lang }
            })
        })
    }
    onImageDrop(files) {
        console.log(files[0]);
        this.setState({
            uploadedFile: files[0]
        });
        this.uploadImage(files[0]);
    }
    uploadImage(file){
        var that = this;
        console.log(file);
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            that.setState({imgPreview: reader.result}
                );
        };
    }
    handleSubmit() {
        var that = this;
        var image = that.props.user.profile.picture;
        if (this.state.imgPreview)
            image = this.state.imgPreview;
        if (this.state.user.username && this.state.user.firstname && this.state.user.lastname && this.state.user.email) {
            axios.post('/api/updateUser/', {
                userId: this.props.user._id,
                username: this.state.user.username,
                firstname: this.state.user.firstname,
                lastname: this.state.user.lastname,
                email: this.state.user.email,
                password: this.state.user.password,
                picture: image,
                lang: this.state.user.lang
            }).then(function (response) {
                // update cookie
                axios.get('/api/getUser/' + that.props.user._id)
                    .then((response) => {
                        cookie.remove('user', {path: '/'});
                        var user = response.data.user;
                        user.profile.picture = '';
                        cookie.save('user', user, {path: '/'});
                        browserHistory.push('/user/' + that.props.user._id)
                    })
            })
        }

    }

    handleChange(e) {
        this.setState({
            user: update(this.state.user, {[e.target.name]: {$set: e.target.value}})
        })
    }

    handleLangChange(param) {
        this.setState({
            user: update(this.state.user, {lang: {$set: param}})
        })
    }

    render() {
        const menu = (
            <Menu>
                <Menu.Item onClick={ () => this.handleLangChange('en')}>
                    <a onClick={ () => this.handleLangChange('en')}>en</a>
                </Menu.Item>
                <Menu.Item onClick={ () => this.handleLangChange('fr')}>
                    <a onClick={ () => this.handleLangChange('fr')}>fr</a>
                </Menu.Item>
            </Menu>
        );

        // checking if user is connected
        if (this.props.cookieUser._id == this.props.user._id) {
            return (
                <Layout style={{backgroundColor: 'white'}}>
                    <Content style={{margin: 'auto'}}>
                        <Card style={{width: 300}}>
                            <Dropzone
                                multiple={false}
                                accept="image/*"
                                onDrop={this.onImageDrop.bind(this)}>
                                <p>{trad.dropzone}</p>
                                <img src={this.state.imgPreview} style={{maxWidth: "100%", maxHeigth: "100%"}}/>
                            </Dropzone>
                            <div className={cx('custom-image')}>
                                <img alt="example" width="100%" src={this.props.user.profile.picture}/>
                            </div>
                            <div className={cx('custom-card')}>
                                <div style={{ textAlign: 'center' }}>
                                    {trad.username}
                                    <Input type="text"
                                           className={cx('input')}
                                           name="username"
                                           placeholder={trad.username}
                                           value={this.state.user.username}
                                           onChange={this.handleChange.bind(this)}
                                           style={{ marginLeft: 0 }}
                                    />
                                    {trad.firstname}
                                    <Input type="text"
                                           className={cx('input')}
                                           name="firstname"
                                           placeholder={trad.firstname}
                                           value={this.state.user.firstname}
                                           onChange={this.handleChange.bind(this)}
                                           style={{ marginLeft: 0 }}
                                    />
                                    {trad.lastname}
                                    <Input type="text"
                                           className={cx('input')}
                                           name="lastname"
                                           placeholder={trad.lastname}
                                           value={this.state.user.lastname}
                                           onChange={this.handleChange.bind(this)}
                                           style={{ marginLeft: 0 }}
                                    />
                                    {trad.pwd}
                                    <Input type="password"
                                           className={cx('input')}
                                           name="password"
                                           placeholder={trad.pwd}
                                           value={this.state.user.password}
                                           onChange={this.handleChange.bind(this)}
                                           style={{ marginLeft: 0 }}
                                    />
                                    Email
                                    <Input type="email"
                                           className={cx('input')}
                                           name="email"
                                           placeholder="email"
                                           value={this.state.user.email}
                                           onChange={this.handleChange.bind(this)}
                                           style={{ marginLeft: 0 }}
                                    />
                                    <div>
                                        <Dropdown overlay={menu}>
                                            <a className="ant-dropdown-link" href="#">
                                                Language <Icon type="down" />
                                            </a>
                                        </Dropdown>
                                    </div>
                                    <Button
                                        type='primary'
                                        className={cx('button')}
                                        onClick={() => this.handleSubmit()}
                                        style={{ width: 100, marginLeft: 10, marginTop: 10}}
                                    >
                                        {trad.save}
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
