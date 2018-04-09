'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _posts = require('../controllers/posts');

var PostsController = _interopRequireWildcard(_posts);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = (0, _express.Router)();

router.get('/', PostsController.getAllPosts);

router.post('/', PostsController.createPost);

exports.default = router;
//# sourceMappingURL=posts.js.map