var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash = require('connect-flash');
// get login page
router.get('/', function (req, res, next) {
  res.render('login/login', { 
    message: req.flash('error'),
    info: req.flash('info')
  });
});
// post login page
router.post('/',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
);

module.exports = router;
