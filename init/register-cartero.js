var path = require('path');
module.exports = function (app) {
  var carteroHook = require('cartero-node-hook');
  var carteroMiddleware = require('cartero-express-middleware');
  var h = carteroHook(path.join(__dirname, '../public/assets'), {
    outputDirUrl: 'assets/'
  });

  app.use(carteroMiddleware(h));
};