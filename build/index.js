'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _swaggerUiExpress = require('swagger-ui-express');

var _swaggerUiExpress2 = _interopRequireDefault(_swaggerUiExpress);

var _yamljs = require('yamljs');

var _yamljs2 = _interopRequireDefault(_yamljs);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _v = require('./routes/v1');

var _v2 = _interopRequireDefault(_v);

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

var _socket3 = require('./socket');

var _socket4 = _interopRequireDefault(_socket3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import path from 'path';

var app = (0, _express2.default)();
var server = _http2.default.createServer(app);
var io = (0, _socket2.default)(server);

var swaggerDocument = _yamljs2.default.load('./swagger.yml');

(0, _socket4.default)(io);

app.use(_bodyParser2.default.json({
  limit: _config2.default.bodyLimit
}));

_models2.default.sequelize.authenticate().then(function () {
  console.log('DB Connection has been established successfully:', _config2.default.db_name);
}).catch(function (err) {
  console.error('There is connection in ERROR:', _config2.default.db_name, err);
});

if (_config.env === 'development') {
  _models2.default.sequelize.sync();
  // models.sequelize.sync({ force: true }); // for test
}

app.use('/api/v1', _v2.default);

app.use('/api-docs', _swaggerUiExpress2.default.serve, _swaggerUiExpress2.default.setup(swaggerDocument));

app.use('/api/*', function (req, res, next) {
  var err = new Error('Not found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(error.status || 500);
  res.render('error');
});

if (_config.env === 'production') {
  var path = require('path');

  app.use('/static', _express2.default.static(path.join(__dirname, '../src', 'client', 'build', 'static')));

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../src', 'client', 'build', 'index.html'));
  });
}

server.listen(_config2.default.port, function (err) {
  if (err) {
    console.log(err);
  }
  console.info('==> \uD83C\uDF0E Started on port ' + server.address().port);
});

exports.default = app;
//# sourceMappingURL=index.js.map