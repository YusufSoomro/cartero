var express = require('express');
var router = express.Router();
var passport = require('passport');

// get logout page
router.get('/', function (req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
