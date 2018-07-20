// @ts-check
const passport = require('passport');
const passportJwt = require('passport-jwt');

const jwtOptions = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret'
  // todo: add issuer and audience
};

const users = {
  123: {
    name: 'david'
  }
};

passport.use(
  new passportJwt.Strategy(jwtOptions, (payload, done) => {
    const user = users[payload.sub];
    console.log(payload);
    if (user) {
      return done(null, user, payload);
    }
  })
);
