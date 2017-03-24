import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { manualLogin, signUp, toggleLoginMode } from '../actions/users';
import styles from '../css/components/login';
import hourGlassSvg from '../images/hourglass.svg';
import axios from 'axios'

import en1 from '../../locale-data/en.json';
import fr1 from '../../locale-data/fr.json';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl';
addLocaleData([...en, ...fr]);

const cx = classNames.bind(styles);
var trad;
// if (window.locale != 'fr') {
//     trad = en1.navigation
// }
// else {
    trad = fr1.login;
// }

class LoginOrRegister extends Component {
    /*
   * This replaces getInitialState. Likewise getDefaultProps and propTypes are just
   * properties on the constructor
   * Read more here: https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es6-classes
   */
    constructor(props) {
        super(props);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.state = {value: ''};
    }

    handleChange(event){
        console.log(event.target);
        this.setState({value: event.target.value});
    }

    handleOnSubmit(event) {
        event.preventDefault();

        const { manualLogin, signUp, user: { isLogin } } = this.props;
        const email = ReactDOM.findDOMNode(this.refs.email).value;
        const password = ReactDOM.findDOMNode(this.refs.password).value;

        if (isLogin) {
            manualLogin({ email, password });
        } else {
            const firstname = ReactDOM.findDOMNode(this.refs.firstname).value;
            const lastname = ReactDOM.findDOMNode(this.refs.lastname).value;
            const username = ReactDOM.findDOMNode(this.refs.username).value;
            signUp({ email, password, username, firstname, lastname});
        }
    }

    forgotPassword(){
        var mail = prompt("enter your email", "")
        console.log('mail=', mail)
        if (mail != null && mail.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
        {
            axios.post('/sendPassword', {mail: mail})
                .then(function(response){alert('a password has been send to your email if it is linked to an account')})
                .catch(function(error){alert('a problem occured, please try later'+error)})
        }
        else {
            alert('invalid mail format')
        }
    }

    renderHeader() {
        const { user: { isLogin }, toggleLoginMode } = this.props;
        if (isLogin) {
            return (
                <div className={cx('header')}>
                    <h1 className={cx('heading')}>{trad.title_1}</h1>
                    <div className={cx('alternative')}>
                        {trad.undertitle_1}
                        <a
                            className={cx('alternative-link')}
                            onClick={toggleLoginMode}
                        >{trad.register_1}</a>
                    </div>
                </div>
            );
        }

        return (
            <div className={cx('header')}>
                <h1 className={cx('heading')}>{trad.title_2}</h1>
                <div className={cx('alternative')}>
                    {trad.undertitle_2}
                    <a
                        className={cx('alternative-link')}
                        onClick={toggleLoginMode}
                    >{trad.register_2}</a>
                </div>
            </div>
        );
    }

    render() {
        const { isWaiting, message, isLogin } = this.props.user;
        if (isLogin) {
            return (
                <div
                    className={cx('login', {
                        waiting: isWaiting
                    })}
                >
                    <div className={cx('container')}>
                        { this.renderHeader() }
                        <img className={cx('loading')} alt="loading" src={hourGlassSvg}/>
                        <div className={cx('email-container')}>
                            <form onSubmit={this.handleOnSubmit}>
                                <input
                                    className={cx('input')}
                                    type="email"
                                    ref="email"
                                    placeholder={trad.email}

                                />
                                <input
                                    className={cx('input')}
                                    type="password"
                                    ref="password"
                                    placeholder={trad.pwd}
                                />
                                <div className={cx('hint')}>
                                    <div>Hint</div>
                                    <div>{trad.hint}</div>
                                </div>
                                <p
                                    className={cx('message', {
                                        'message-show': message && message.length > 0
                                    })}>{message}</p>
                                <input
                                    type="submit"
                                    value={isLogin ? trad.login : trad.register}
                                />
                            </form>
                            <div><button onClick={this.forgotPassword.bind(this)}>{trad.forgot}</button></div>
                        </div>
                        <div className={cx('google-container')}>
                            <h1 className={cx('heading')}>{trad.google}</h1>
                            <a
                                className={cx('button')}
                                href="/auth/google">{trad.google}</a>
                        </div>
                        <div className={cx('key42-container')}>
                            <h1 className={cx('heading')}>{trad.quarante_deux}</h1>
                            <a
                                className={cx('button')}
                                href="/auth/42">{trad.quarante_deux}</a>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div
                className={cx('login', {
                    waiting: isWaiting
                })}
            >
                <div className={cx('container')}>
                    { this.renderHeader() }
                    <img className={cx('loading')} alt="loading" src={hourGlassSvg}/>
                    <div className={cx('email-container')}>
                        <form onSubmit={this.handleOnSubmit}>
                            <input
                                className={cx('input')}
                                type="email"
                                ref="email"
                                placeholder={trad.email}

                            />
                            <input
                                className={cx('input')}
                                type="password"
                                ref="password"
                                placeholder={trad.pwd}
                            />
                            <input
                                className={cx('input')}
                                type="text"
                                ref="username"
                                placeholder={trad.username}
                                value={this.state.value}
                                onChange={this.handleChange}
                            />
                            <input
                                className={cx('input')}
                                type="text"
                                ref="firstname"
                                placeholder={trad.firstname}
                                value={this.state.value}
                                onChange={this.handleChange}
                            />
                            <input
                                className={cx('input')}
                                type="text"
                                ref="lastname"
                                placeholder={trad.lastname}
                                value={this.state.value}
                                onChange={this.handleChange}
                            />

                            <div className={cx('hint')}>
                                <div>Hint</div>
                                <div>{trad.hint}</div>
                            </div>
                            <p
                                className={cx('message', {
                                    'message-show': message && message.length > 0
                                })}>{message}</p>
                            <input
                                type="submit"
                                value={isLogin ? trad.login : trad.register}
                            />
                        </form>
                    </div>
                    <div className={cx('google-container')}>
                        <h1 className={cx('heading')}>{trad.google}</h1>
                        <a
                            className={cx('button')}
                            href="/auth/google">{trad.google}</a>
                    </div>
                    <div className={cx('key42-container')}>
                        <h1 className={cx('heading')}>{trad.quarante_deux}</h1>
                        <a
                            className={cx('button')}
                            href="/auth/42">{trad.quarante_deux}</a>
                    </div>
                </div>
            </div>
        );
    }
}

LoginOrRegister.propTypes = {
    user: PropTypes.object,
    manualLogin: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
    toggleLoginMode: PropTypes.func.isRequired
};

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps({user}) {
    return {
        user
    };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps, { manualLogin, signUp, toggleLoginMode })(LoginOrRegister);
