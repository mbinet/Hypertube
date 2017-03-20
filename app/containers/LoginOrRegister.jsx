import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { manualLogin, signUp, toggleLoginMode } from '../actions/users';
import styles from '../css/components/login';
import hourGlassSvg from '../images/hourglass.svg';

const cx = classNames.bind(styles);

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
    const firstname = ReactDOM.findDOMNode(this.refs.firstname).value;
    const lastname = ReactDOM.findDOMNode(this.refs.lastname).value;
    const username = ReactDOM.findDOMNode(this.refs.username).value;

    if (isLogin) {
      manualLogin({ email, password });
    } else {
      signUp({ email, password, username, firstname, lastname});
    }
  }

  renderHeader() {
    const { user: { isLogin }, toggleLoginMode } = this.props;
    if (isLogin) {
      return (
        <div className={cx('header')}>
          <h1 className={cx('heading')}>Login with Email</h1>
          <div className={cx('alternative')}>
            Not what you want?
            <a
              className={cx('alternative-link')}
              onClick={toggleLoginMode}
            >Register an Account</a>
          </div>
        </div>
      );
    }

    return (
      <div className={cx('header')}>
        <h1 className={cx('heading')}>Register with Email</h1>
        <div className={cx('alternative')}>
          Already have an account?
          <a
            className={cx('alternative-link')}
            onClick={toggleLoginMode}
          >Login</a>
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
                        placeholder="email"

                    />
                    <input
                        className={cx('input')}
                        type="password"
                        ref="password"
                        placeholder="password"
                    />
                    <div className={cx('hint')}>
                      <div>Hint</div>
                      <div>email: example@ninja.com password: ninja</div>
                    </div>
                    <p
                        className={cx('message', {
                            'message-show': message && message.length > 0
                        })}>{message}</p>
                    <input
                        type="submit"
                        value={isLogin ? 'Login' : 'Register'}
                    />
                  </form>
                </div>
                <div className={cx('google-container')}>
                  <h1 className={cx('heading')}>Google Login Demo</h1>
                  <a
                      className={cx('button')}
                      href="/auth/google">Login with Google</a>
                </div>
                <div className={cx('key42-container')}>
                  <h1 className={cx('heading')}>42 Login Demo</h1>
                  <a
                      className={cx('button')}
                      href="/auth/42">Login with 42</a>
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
                      placeholder="email"

                  />
                  <input
                      className={cx('input')}
                      type="password"
                      ref="password"
                      placeholder="password"
                  />
                  <input
                      className={cx('input')}
                      type="text"
                      ref="username"
                      placeholder="username"
                      value={this.state.value}
                      onChange={this.handleChange}
                  />
                  <input
                      className={cx('input')}
                      type="text"
                      ref="firstname"
                      placeholder="firstname"
                      value={this.state.value}
                      onChange={this.handleChange}
                  />
                  <input
                      className={cx('input')}
                      type="text"
                      ref="lastname"
                      placeholder="lastname"
                      value={this.state.value}
                      onChange={this.handleChange}
                  />

                  <div className={cx('hint')}>
                    <div>Hint REGISTER</div>
                    <div>email: example@ninja.com password: ninja</div>
                  </div>
                  <p
                      className={cx('message', {
                          'message-show': message && message.length > 0
                      })}>{message}</p>
                  <input
                      type="submit"
                      value={isLogin ? 'Login' : 'Register'}
                  />
                </form>
              </div>
              <div className={cx('google-container')}>
                <h1 className={cx('heading')}>Google Login Demo</h1>
                <a
                    className={cx('button')}
                    href="/auth/google">Login with Google</a>
              </div>
              <div className={cx('key42-container')}>
                <h1 className={cx('heading')}>42 Login Demo</h1>
                <a
                    className={cx('button')}
                    href="/auth/42">Login with 42</a>
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
