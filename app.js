var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var routes = require('./routes/index');
var users = require('./routes/users');

var models = require('./models');

var app = express();
var session = require('express-session');

var carteroHook = require('cartero-node-hook');
var carteroMiddleware = require('cartero-express-middleware');

var h = carteroHook( path.join(__dirname,'public/assets'), {outputDirUrl : 'assets/'});

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var uuid = require("node-uuid");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(carteroMiddleware(h));
app.use(session({
  genid: function(req) {
    return uuid() // use UUIDs for session IDs
  },
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

// passport initialization
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  // query the current user from database
  models.User.findById(id)
    .then(function(user){
        done(null, user);
    }).catch(function(err){
        done(new Error('User ' + id + ' does not exist'));
    });
});


passport.use(new LocalStrategy(
  function(username, password, done) {
    /* get the username and password from the input arguments of the function */
    models.User.find( { where: {username: username}} ).then(function(user){
      if(!user) {
        return done(null, false, {message: "The user is not exist"});
      }
      if(user.password === password) {
        return done(null, user);
      }
      return done(null, false, {message: "Wrong password"});
    }).catch(function(err){
      return done(err);
    });
  }
));


app.use('/', routes);
app.use('/users', users);
app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error/error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error/error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
