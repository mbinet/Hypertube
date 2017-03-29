/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';

const usersController = controllers && controllers.users;
const topicsController = controllers && controllers.topics;

export default (app) => {
  // user routes
  if (usersController) {
    app.post('/login', usersController.login);
    app.post('/signup', usersController.signUp);
    app.post('/logout', usersController.logout);
  } else {
    console.warn(unsupportedMessage('users routes'));
  }

  if (passportConfig && passportConfig.google) {
    // google auth
    // Redirect the user to Google for authentication. When complete, Google
    // will redirect the user back to the application at
    // /auth/google/return
    // Authentication with google requires an additional scope param, for more info go
    // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
    app.get('/auth/google', passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }));

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/google/callback',function(req, res, next) {
        passport.authenticate('google', (authErr, user, info) => {
            if (authErr) return next(authErr);
            if (!user) {
                return res.redirect('/login');
            }
            // Passport exposes a login() function on req (also aliased as
            // logIn()) that can be used to establish a login session
            return req.logIn(user, (loginErr) => {
                if (loginErr) return res.redirect('/login');
                user.password = '';
                res.cookie('user', user);
                return res.redirect('/');
            });
        })(req, res, next)
    });
  }
    if (passportConfig && passportConfig.facebook) {
        // google auth
        // Redirect the user to Google for authentication. When complete, Google
        // will redirect the user back to the application at
        // /auth/google/return
        // Authentication with google requires an additional scope param, for more info go
        // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
        app.get('/auth/facebook', passport.authenticate('facebook',{ scope: ['email', 'public_profile'] }));

        // Google will redirect the user to this URL after authentication. Finish the
        // process by verifying the assertion. If valid, the user will be logged in.
        // Otherwise, the authentication has failed.
        app.get('/auth/facebook/callback',function(req, res, next) {
            passport.authenticate('facebook', (authErr, user, info) => {
                if (authErr) return next(authErr);
                if (!user) {
                    return res.redirect('/login');
                }
                // Passport exposes a login() function on req (also aliased as
                // logIn()) that can be used to establish a login session
                return req.logIn(user, (loginErr) => {
                    if (loginErr) return res.redirect('/login');
                    user.password = '';
                    res.cookie('user', user);
                    return res.redirect('/');
                });
            })(req, res, next)
        });
    }
  if (passportConfig && passportConfig.key42) {
    // google auth
    // Redirect the user to Google for authentication. When complete, Google
    // will redirect the user back to the application at
    // /auth/google/return
    // Authentication with google requires an additional scope param, for more info go
    // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
    app.get('/auth/42', passport.authenticate('42'));

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/42/callback', function(req, res, next) {
        passport.authenticate('42', (authErr, user, info) => {
            if (authErr) return next(authErr);
            if (!user) {
                return res.redirect('/login');
            }
            // Passport exposes a login() function on req (also aliased as
            // logIn()) that can be used to establish a login session
            return req.logIn(user, (loginErr) => {
                if (loginErr) return res.redirect('/login');
                user.password = '';
                res.cookie('user', user);
                return res.redirect('/');
            });
        })(req, res, next)
    });
  }

  // topic routes
  if (topicsController) {
    app.get('/topic', topicsController.all);
    app.post('/topic/:id', topicsController.add);
    app.put('/topic/:id', topicsController.update);
    app.delete('/topic/:id', topicsController.remove);
  } else {
    console.warn(unsupportedMessage('topics routes'));
  }
};
