var express = require('express');
var models = require('./models');
var app = express();

require('./init/setup-view-engine.js')(app);
require('./init/register-middlewares.js')(app);
require('./init/register-cartero.js')(app);
require('./init/register-routes.js')(app);
require('./init/register-error-handling.js')(app);

require('./init/register-passport.js')(app);

module.exports = app;