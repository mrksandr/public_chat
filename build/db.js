'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sequelize = new _sequelize2.default('sqlite://' + _path2.default.join(__dirname, 'chat.sqlite'), {
  dialect: 'sqlite',
  storage: _path2.default.join(__dirname, 'chat.sqlite')
});

sequelize.authenticate().then(function (err) {
  if (err) {
    console.log('There is connection in ERROR');
  } else {
    console.log('DB Connection has been established successfully');
  }
});

exports.default = sequelize;
//# sourceMappingURL=db.js.map