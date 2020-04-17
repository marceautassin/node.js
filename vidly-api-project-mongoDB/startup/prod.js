const helmet = require('helmet');
const compressioin = require('compression');

module.exports = function (app) {
  app.use(helmet()); // Define HTTP headers
  app.use(compression());
};
