//import { OAuth2Strategy as FacebookStrategy } from 'passport-facebook';
var FacebookStrategy = require('passport-facebook').Strategy;
import { facebook } from '../../../config/secrets';
import unsupportedMessage from '../../db/unsupportedMessage';
import { passport as dbPassport } from '../../db';

export default (passport) => {
    if (!dbPassport || !dbPassport.facebook || !typeof dbPassport.facebook === 'function') {
        console.warn(unsupportedMessage('passport-facebook'));
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
    passport.use(new FacebookStrategy({
        clientID: facebook.clientID,
        clientSecret: facebook.clientSecret,
        callbackURL: "https://localhost:3001/auth/facebook/callback",
        profileFields: ['id', 'first_name', 'last_name', 'email', 'picture.type(large)']
    }, dbPassport.facebook));
};