var path = require('path');
var carteroHook = require('cartero-node-hook');
var carteroMiddleware = require('cartero-express-middleware');
module.exports = function (app) {
  var h = carteroHook(path.join(__dirname, '../public/assets'), {
    outputDirUrl: 'assets/'
  });

  app.use(carteroMiddleware(h));
};