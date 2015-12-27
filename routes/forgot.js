var express = require('express');
var router = express.Router();
var flash = require('connect-flash');
var fs = require('fs');
var nodemailer = require('nodemailer');
var models = require('../models');
var async = require('asynce');

// password recovery
router.get('/password', function (req, res) {
  res.render('forgot/password', {
    title : "Recover your password",
    error: req.flash('error'),
    info: req.flash('info')
  });
});

router.post('/password', function (req, res, next) {
  models.User.findOne({
    where: {
      email: req.body.email
    } 
  }).then(function(user){
    if(!user){
      req.flash('error', 'user does not exist');
      res.redirect('/forgot/password');
    }
    res.send('found user: ' + JSON.stringify(user));
    

    // async series requests to database and email
    // for database
    //   set pw reset token
    //   set pw reset expiration
    // for email creation
    //   send email with token in url from account
    // if succesful redirect to email sent page,{u: u.uname}
    // if error
    //   if db cannot be updated, then say error with system
    //   if updated db but email not sent then say error sending email
  }).catch(function(err){
    req.flash('error', 'system error...please try again later.');
    res.redirect('/forgot/password');
  });
});

// username retrieval
//router.get('/username', function (req, res){
//  res.render('forgot/username', {
//    title: "Retrieve username"
//  });
//});
//
//router.post('/username', function (req, res, next){
//  
//});

module.exports = router;
