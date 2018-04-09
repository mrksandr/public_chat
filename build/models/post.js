'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Sequilize = require('sequelize');

var connection = require('../db');

var Post = sequilize.define('post', {
  username: {
    type: Sequilize.STRING
  },
  text: {
    type: Sequilize.STRING
  }
});

exports.default = Post;
//# sourceMappingURL=post.js.map