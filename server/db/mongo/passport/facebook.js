import User from '../models/user';

/* eslint-disable no-param-reassign */
export default (req, accessToken, refreshToken, profile, done) => {
    var split = profile._json.email.split('@');
    if (req.user) {
        return User.findOne({ facebook: profile.id }, (findOneErr, existingUser) => {
            if (existingUser) {
                return done(null, false, { message: 'There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
            }
            return User.findById(req.user.id, (findByIdErr, user) => {
                user.facebook = profile.id;
                user.tokens.push({ kind: 'key42', accessToken });
                user.profile.username = user.profile.username || split[0];
                user.profile.firstname = user.profile.firstname || profile._json.first_name;
                user.profile.lastname = user.profile.lastname || profile._json.last_name;
                user.profile.picture = user.profile.picture || profile._json.picture.data.url;
                user.save((err) => {
                    done(err, user, { message: 'Facebook account has been linked.' });
                });
            });
        });
    }
    return User.findOne({ facebook: profile._json.id }, (findByFacebookIdErr, existingUser) => {
        if (existingUser) return done(null, existingUser);
        return User.findOne({ email: profile._json.email}, (findByEmailErr, existingEmailUser) => {
            if (existingEmailUser) {
                return done(null, false, { message: 'There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.' });
            }
            const user = new User();
            user.email = profile._json.email;
            user.facebook = profile._json.id;
            user.tokens.push({ kind: 'facebook', accessToken });
            user.profile.firstname = profile._json.first_name;
            user.profile.lastname = profile._json.last_name;
            user.profile.username = split[0];
            user.profile.picture = profile._json.picture.data.url;
            return user.save((err) => {
                done(err, user);
            });
        });
    });
};