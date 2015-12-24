var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  debugger;
  res.render('index/index', { title: 'Express' });
});

// get login page
router.get('/login', function(req, res, next) {
  res.render('login/login');
});
// post login page
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

router.get('/register', function(req, res, next){
  res.render('register/register');
});


module.exports = router;
