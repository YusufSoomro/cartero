var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', 
function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash('error', 'please log in');
  res.redirect('/login');
}, 
function (req, res, next) {
  res.render('dashboard/dashboard', {
    title: 'Dashboard'
  });
});

module.exports = router;
