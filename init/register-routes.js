var routes = require('../routes/index');
var users = require('../routes/users');
var login = require('../routes/login');
var register = require('../routes/register');



module.exports = function (app) {
  app.use('/', routes);
  app.use('/users', users);
  app.use('/login', login);
  app.use('/register', register);
};