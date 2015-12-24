var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function (req, res, next) {
  res.render('register/register');
});

router.post('/', function (req, res, next) {
  models.User.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    })
    .then(function (newUser) {
      res.render('success/newUserSuccess', {
        user: JSON.stringify(newUser)
      });
    })
    .catch(function (err) {
      res.render('success/newUserFail', {
        user: JSON.stringify(err.errors)
      });
    });
});

module.exports = router;