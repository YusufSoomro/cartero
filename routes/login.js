var express = require('express');
var router = express.Router();
var passport = require('passport');

// get login page
router.get('/', function (req, res, next) {
  res.render('login/login');
});
// post login page
router.post('/',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

module.exports = router;