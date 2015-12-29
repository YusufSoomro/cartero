var express = require('express');
var app = express();

require('./init/view-engine.js')(app);
require('./init/middlewares.js')(app);
require('./init/cartero.js')(app);
require('./init/passport.js')(app);
require('./init/routes.js')(app);
require('./init/error-handling.js')(app);

module.exports = app;
