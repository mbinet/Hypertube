import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { fetchVoteData } from './fetch-data';
import { App, Vote, Dashboard, About, LoginOrRegister,AllUsers, Test, Film, Search, User, UserUpdate } from './pages';
import cookie from 'react-cookie'

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
    const requireAuth = (nextState, replace, callback) => {
        const { user: { authenticated }} = store.getState();
        if (!authenticated) {
            replace({
                pathname: '/login',
                state: { nextPathname: nextState.location.pathname }
            });
        }
        callback();
    };

    const redirectAuth = (nextState, replace, callback) => {
        const { user: { authenticated }} = store.getState();
        if (authenticated) {
            replace({
                pathname: '/'
            });
        }
        callback();
    };
    return (
        <Route path="/" component={App}>
            {/*<IndexRoute component={Vote} fetchData={fetchVoteData} />*/}
            <IndexRoute component={Search} onEnter={requireAuth} />
            <Route path="login" component={LoginOrRegister} onEnter={redirectAuth} />


            <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />


            <Route path="dashboard" component={Dashboard} />
            <Route path="search" component={Search} onEnter={requireAuth} />
            <Route path="film/:idImdb" component={Film} onEnter={requireAuth} />
            <Route path="user/:idUser" component={User} onEnter={requireAuth} />
            <Route path="user/:idUser/update" component={UserUpdate} onEnter={requireAuth} />
            <Route path="allusers" component={AllUsers} onEnter={requireAuth} />
            <Route path="about" component={About} />
        </Route>
    );
};
