import en1 from '../../locale-data/en.json';
import fr1 from '../../locale-data/fr.json';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl';
addLocaleData([...en, ...fr]);

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { logOut } from '../actions/users';
import styles from '../css/components/navigation';
import cookie from 'react-cookie'

const cx = classNames.bind(styles);

const Navigation = ({ user, logOut }) => {
    var trad;
    // if (window.locale != 'fr') {
    //     trad = en1.navigation
    // }
    // else {
        trad = en1.navigation
    // }
    var userCookie;
    var linkUser = "";

    if (userCookie = cookie.load('user')) {
        if (userCookie[0] == 'j') {
            userCookie = userCookie.substr(2)
            userCookie = JSON.parse(userCookie)
        }
        linkUser = <Link className={cx('item')} to={'/user/' + userCookie._id } >{trad.profile}</Link>
    }

    return (
        <IntlProvider locale='fr' messages={fr1} >
            <nav className={cx('navigation')} role="navigation">
                <Link
                    to="/"
                    className={cx('item', 'logo')}
                    activeClassName={cx('active')}>HYPERFASTTUBE</Link>
                { user.authenticated ? (
                        <span><Link
                            onClick={logOut}
                            className={cx('item')} to="/"
                            >{trad.logout}</Link>
                            {linkUser}
                            <Link className={cx('item')} to="/search" >{trad.search}</Link>
                        </span>
                    ) : (
                        <span>
                        <Link className={cx('item')} to="/login" >{trad.login}</Link>
                        <Link className={cx('item')} to="/search" >{trad.search}</Link>
                        </span>
                    )}
                {/*<Link className={cx('item')} to="/dashboard">DASHBOARD</Link>*/}
                {/*<Link to="/about" className={cx('item')} activeClassName={cx('active')}>{trad.about}</Link>*/}
            </nav>
        </IntlProvider>
    );
};

Navigation.propTypes = {
    user: PropTypes.object,
    logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, { logOut })(Navigation);
