'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
require('dotenv').config();

var env = exports.env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    port: process.env.PORT || 8000,
    bodyLimit: '100kb',

    db_dialect: process.env.DB_DIALECT || 'sqlite',
    db_host: process.env.DB_HOST || '',
    db_port: process.env.DB_PORT || '',
    db_name: process.env.DB_NAME || 'chat.sqlite',
    db_user: process.env.DB_USER || '',
    db_password: process.env.DB_PASSWORD || '',
    db_storage: process.env.DB_STORAGE || 'chat.sqlite'
  },
  production: {
    port: process.env.PORT || 8000,
    bodyLimit: '100kb',

    db_dialect: process.env.DB_DIALECT || 'sqlite',
    db_host: process.env.DB_HOST || '',
    db_port: process.env.DB_PORT || '',
    db_name: process.env.DB_NAME || 'chat.sqlite.prod',
    db_user: process.env.DB_USER || '',
    db_password: process.env.DB_PASSWORD || '',
    db_storage: process.env.DB_STORAGE || 'chat.sqlite.prod'
  }
};

exports.default = config[env];
//# sourceMappingURL=index.js.map