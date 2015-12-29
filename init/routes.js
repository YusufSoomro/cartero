var routes = require('../routes/index');
var users = require('../routes/users');
var login = require('../routes/login');
var register = require('../routes/register');
var logout = require('../routes/logout');
var forgot = require('../routes/forgot');
var dashboard = require('../routes/dashboard');

module.exports = function (app) {
  app.use('/', routes);
  app.use('/users', users);
  app.use('/login', login);
  app.use('/register', register);
  app.use('/logout', logout);
  app.use('/forgot', forgot);
  app.use('/dashboard', dashboard);
};
