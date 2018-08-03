const passport = require('passport');
const passportGoogle = require('passport-google-oauth');
const db = require('../db');

const google = {
  clientID:
    '711800432640-8ssgfe0g0j7obok8n7ca61islvlpn7cc.apps.googleusercontent.com',
  clientSecret: '-B8-Fmv5fTzx4GKUDniomj_i'
};

const passportConfig = {
  clientID: google.clientID,
  clientSecret: google.clientSecret,
  callbackURL: 'http://localhost:3000/auth/google/redirect'
};

passport.use(
  new passportGoogle.OAuth2Strategy(
    passportConfig,
    async (request, accessToken, refreshToken, profile, done) => {
      // See if this user already exists
      const user = await findUser;
      db.createUser('google', profile);
      return done(null, profile);
    }
  )
);
