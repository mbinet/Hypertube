/** Important **/
/** You should not be committing this file to GitHub **/
/** Repeat: DO! NOT! COMMIT! THIS! FILE! TO! YOUR! REPO! **/
export const sessionSecret = process.env.SESSION_SECRET || 'Your Session Secret goes here';
export const google = {
  clientID: process.env.GOOGLE_CLIENTID || '62351010161-eqcnoa340ki5ekb9gvids4ksgqt9hf48.apps.googleusercontent.com',
  clientSecret: process.env.GOOGLE_SECRET || '6cKCWD75gHgzCvM4VQyR5_TU',
  callbackURL: process.env.GOOGLE_CALLBACK || '/auth/google/callback'
};

export const key42 = {
  clientID: process.env.KEY42_CLIENTID || 'e73eff7829762477f0755d7ec890323ad34c9a831d53dd8cbee146c929398ab5',
  clientSecret: process.env.KEY42_SECRET || 'dda4bc3561031497b1792fef4642b7475f7e4ccf4891106b4470e841a908845b',
  callbackURL: process.env.KEY42_CALLBACK || '/auth/42/callback'
};

export const facebook = {
    clientID: process.env.FACEBOOK_CLIENTID || '380797335636741',
    clientSecret: process.env.FACEBOOK_SECRET || 'a463d6726c9a8c1a142c1bad8ba9d61a',
    callbackURL: process.env.FACEBOOK_CALLBACK || '/auth/facebook/callback'
};