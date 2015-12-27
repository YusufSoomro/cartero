var express = require('express');
var router = express.Router();
var models = require('../models');
var bcrypt = require('bcrypt');

router.get('/', function (req, res, next) {
  res.render('register/register', { 
    error: req.flash('error'),
    info: req.flash('info')
  });
});

router.post('/', function (req, res, next) {
  var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  models.User.create({
      email: req.body.email,
      username: req.body.username,
      password: hash
    })
    .then(function (newUser) {
      req.flash('info',  'user created successfully!');
      res.redirect('/login'); 
    })
    .catch(function (err) {
      req.flash('error', 'error in user creation');
      res.redirect('/register');
    });
});

module.exports = router;
