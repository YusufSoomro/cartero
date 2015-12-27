var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var models = require('../models');
var bcrypt = require('bcrypt');

module.exports = function (app) {

  // passport initialization
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    // query the current user from database
    models.User.findById(id)
      .then(function (user) {
        done(null, user);
      }).catch(function (err) {
        done(new Error('User ' + id + ' does not exist'));
      });
  });


  passport.use(new LocalStrategy(
    function (username, password, done) {
      /* get the username and password from the input arguments of the function */
      models.User.find({
        where: {
          username: username
        }
      }).then(function (user) {
        debugger;
        if (!user) {
          return done(null, false, {
            message: "Incorrect user name or password"
          });
        }
        if (bcrypt.compareSync(password, user.password)) {
          return done(null, user);
        }
        return done(null, false, {
          message: "Incorrect user name or password"
        });
      }).catch(function (err) {
        return done(err);
      });
    }
  ));
};
