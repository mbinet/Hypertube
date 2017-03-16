import User from '../models/user';

/* eslint-disable no-param-reassign */
export default (req, accessToken, refreshToken, profile, done) => {
  if (req.user) {
    return User.findOne({ key42: profile.id }, (findOneErr, existingUser) => {
      if (existingUser) {
        return done(null, false, { message: 'There is already a 42 account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
      }
      return User.findById(req.user.id, (findByIdErr, user) => {
        user.key42 = profile.id;
        user.tokens.push({ kind: 'key42', accessToken });
        user.profile.username = user.profile.username || profile._json.login;
        user.profile.firstname = user.profile.firstname || profile._json.first_name;
        user.profile.lastname = user.profile.lastname || profile._json.last_name;
        //user.profile.gender = user.profile.gender || profile._json.gender;
        user.profile.picture = user.profile.picture || profile._json.image_url;
        user.save((err) => {
          done(err, user, { message: '42 account has been linked.' });
        });
      });
    });
  }
  return User.findOne({ key42: profile._json.id }, (findBykey42IdErr, existingUser) => {
    if (existingUser) return done(null, existingUser);
    return User.findOne({ email: profile._json.email}, (findByEmailErr, existingEmailUser) => {
      if (existingEmailUser) {
        return done(null, false, { message: 'There is already an account using this email address. Sign in to that account and link it with 42 manually from Account Settings.' });
      }
      const user = new User();
      user.email = profile._json.email;
      user.key42 = profile._json.id;
      user.tokens.push({ kind: 'key42', accessToken });
      user.profile.firstname = profile._json.first_name;
      user.profile.lastname = profile._json.last_name;
      user.profile.username = profile._json.login;
      //user.profile.gender = profile._json.gender;
      user.profile.picture = profile._json.image_url;
      return user.save((err) => {
        done(err, user);
      });
    });
  });
};
/* eslint-enable no-param-reassign */
