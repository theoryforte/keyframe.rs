// @ts-check
var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['openid', 'profile', 'email']
  })
);

router.get(
  '/auth/google/redirect',
  passport.authenticate('google', {
    scope: ['openid', 'profile', 'email']
  }),
  (req, res) => {
    res.send(JSON.stringify(req.user));
  }
);

module.exports = router;
