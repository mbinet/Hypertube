import User from '../models/user';

/* eslint-disable no-param-reassign */
export default (req, accessToken, refreshToken, profile, done) => {
    var split = profile._json.emails[0].value.split('@');
    var url = profile._json.image.url.replace(/([0-9]*)$/, '500');
  if (req.user) {
    return User.findOne({ google: profile.id }, (findOneErr, existingUser) => {
      if (existingUser) {
        return done(null, false, { message: 'There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
      }
      return User.findById(req.user.id, (findByIdErr, user) => {
        user.google = profile.id;
        user.tokens.push({ kind: 'google', accessToken });
        user.profile.firstname = user.profile.firstname || profile._json.name.givenName;
        user.profile.lastname = user.profile.lastname || profile._json.name.familyName;
        user.profile.username = user.profile.username || split[0];
        user.profile.picture = user.profile.picture || url;
        user.save((err) => {
          done(err, user, { message: 'Google account has been linked.' });
        });
      });
    });
  }
  return User.findOne({ google: profile.id }, (findByGoogleIdErr, existingUser) => {
    if (existingUser) return done(null, existingUser);
    return User.findOne({ email: profile._json.emails[0].value }, (findByEmailErr, existingEmailUser) => {
      if (existingEmailUser) {
        return done(null, false, { message: 'There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.' });
      }
      var split = profile._json.emails[0].value.split('@');
      const user = new User();
      user.email = profile._json.emails[0].value;
      user.google = profile.id;
      user.tokens.push({ kind: 'google', accessToken });
      user.profile.firstname = profile._json.name.givenName;
      user.profile.lastname = profile._json.name.familyName;
      user.profile.username = split[0];
      user.profile.picture = url;
      return user.save((err) => {
        done(err, user);
      });
    });
  });
};
/* eslint-enable no-param-reassign */
