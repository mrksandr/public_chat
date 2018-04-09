'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelize, DataTypes) {
  var Model = sequelize.define('Post', {
    username: {
      type: _sequelize2.default.STRING(40),
      validate: {
        isIn: {
          args: /\w/gi,
          msg: 'Must be only letters and numbers'
        },
        allowNull: { args: false, msg: 'Name cannot be null' }
      }
    },
    text: {
      type: _sequelize2.default.STRING(200),
      validate: {
        len: {
          args: [1, 200],
          msg: 'Must be less than 200 symbols'
        }
      }
    }
  }, {
    timestamps: true
  });

  return Model;
};

/*
Post.create({ username: 'barfooz', text: '45' })
  .then(post => {
    console.log(
      post.get({
        plain: true,
      }),
    );
  })
  .catch(error => {
    if (error instanceof ValidationError) {
      req.flash('error', error.message);
      return signup(req, res);
    }
    next(error); //go to handle of unexpected  error
  });
*/
//# sourceMappingURL=posts.js.map