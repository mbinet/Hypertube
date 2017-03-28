import passport from 'passport';
import User from '../models/user';

/**
 * POST /login
 */
export function login(req, res, next) {
  // Do email and password validation for the server
    if (!req.body.email) {
        return res.status(302).json({ message: 'invalid email!' });
    }
    if (!req.body.password) {
        return res.status(302).json({ message: 'invalid password!' });
    }
  passport.authenticate('local', (authErr, user, info) => {
    if (authErr) return next(authErr);
    if (!user) {
      return res.status(302).json({ message: info.message });
    }
    // Passport exposes a login() function on req (also aliased as
    // logIn()) that can be used to establish a login session
    return req.logIn(user, (loginErr) => {
      if (loginErr) return res.status(302).json({ message: loginErr });
        user.profile.picture = '';
        user.password = '';
      res.cookie('user', user);
      return res.status(200).json({
        message: 'You have been successfully logged in.'
      });
    });
  })(req, res, next);
}

/**
 * POST /logout
 */
export function logout(req, res) {
  // Do email and password validation for the server
    res.clearCookie('user');
  req.logout();
  res.redirect('/');
}

/**
 * POST /signup
 * Create a new local account
 */
export function signUp(req, res, next) {
  const user = new User();
  if (!req.body.email) {
    return res.status(302).json({ message: 'invalid email!' });
  }
    if (!req.body.password) {
        return res.status(302).json({ message: 'invalid password!' });
    }
    if (!req.body.username) {
        return res.status(302).json({ message: 'invalid username!' });
    }
    if (!req.body.firstname) {
        return res.status(302).json({ message: 'invalid firstname!' });
    }
    if (!req.body.lastname) {
        return res.status(302).json({ message: 'invalid lastname!' });
    }
    if (!req.body.image) {
        return res.status(302).json({ message: 'invalid image!' });
    }
    else {

    }
  User.findOne({ email: req.body.email }, (findErr, existingUser) => {
    if (existingUser) {
      return res.status(302).json({ message: 'Account with this email address already exists!' });
    }
      user.email = req.body.email;
      user.password = req.body.password;
      user.profile.username = req.body.username;
      user.profile.firstname = req.body.firstname;
      user.profile.lastname = req.body.lastname;
      user.profile.picture = req.body.image;
    return user.save((saveErr) => {
      if (saveErr) return next(saveErr);
      return req.logIn(user, (loginErr) => {
        if (loginErr) return res.status(302).json({ message: loginErr });
          user.profile.picture = '';
          user.password = '';
          res.cookie('user', user);
        return res.status(200).json({
          message: 'You have been successfully logged in.'
        });
      });
    });
  });
}

export default {
  login,
  logout,
  signUp
};
