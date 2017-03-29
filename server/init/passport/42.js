//import { OAuth2Strategy as Key42Strategy } from 'passport-42';
var Key42Strategy = require('passport-42').Strategy;
import { key42 } from '../../../config/secrets';
import unsupportedMessage from '../../db/unsupportedMessage';
import { passport as dbPassport } from '../../db';

export default (passport) => {
  if (!dbPassport || !dbPassport.key42 || !typeof dbPassport.key42 === 'function') {
    console.warn(unsupportedMessage('passport-42'));
    return;
  }

  /*
  * OAuth Strategy taken modified from https://github.com/sahat/hackathon-starter/blob/master/config/passport.js
  *
  * - User is already logged in.
  *   - Check if there is an existing account with a provider id.
  *     - If there is, return an error message. (Account merging not supported)
  *     - Else link new OAuth account with currently logged-in user.
  * - User is not logged in.
  *   - Check if it's a returning user.
  *     - If returning user, sign in and we are done.
  *     - Else check if there is an existing account with user's email.
  *       - If there is, return an error message.
  *       - Else create a new account.
  *
  * The Google OAuth 2.0 authentication strategy authenticates
  * users using a Google account and OAuth 2.0 tokens.
  * The strategy requires a verify callback, which accepts these
  * credentials and calls done providing a user, as well
  * as options specifying a client ID, client secret, and callback URL.
  */
  passport.use(new Key42Strategy({
    clientID: key42.clientID,
    clientSecret: key42.clientSecret,
    callbackURL: "https://localhost:3001/auth/42/callback",
  }, dbPassport.key42));
};
/*passport.use(new new Key42Strategy({
    clientID: key42.clientID,
    clientSecret: key42.clientSecret,
    callbackURL: "http://127.0.0.1:3000/auth/42/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ key42: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
  )
);*/