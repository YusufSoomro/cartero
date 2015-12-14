var express = require('express');
var router = express.Router();
var models = require('../models');
/* GET home page. */
router.get('/', function(req, res, next) {
  models.Users.findAll().then(function(data){
    res.json(data);
  });
});

module.exports = router;
