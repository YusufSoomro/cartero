var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var models = require('../models');
var bcrypt = require('bcrypt');

module.exports = function (app) {

  // passport initialization
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
    debugger;
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    // query the current user from database
    models.User.findById(id)
      .then(function (user) {
        debugger;
        done(null, user);
      }).catch(function (err) {
        debugger;
        done(new Error('User ' + id + ' does not exist'));
      });
  });


  passport.use(new LocalStrategy(function (username, password, done) {
    debugger;
    models.User.find({
      where: {
        username: username
      }
    }).then(function (user) {
      if (!user) {
        debugger;
        return done(null, false, {
          message: "Incorrect username"
        });
      }
      if (bcrypt.compareSync(password, user.password)) {
        debugger;
        return done(null, user);
      }
      debugger;
      return done(null, false, {
        message: "Incorrect password"
      });
    }).catch(function (err) {
      debugger;
      return done(err);
    });
  }));
};
