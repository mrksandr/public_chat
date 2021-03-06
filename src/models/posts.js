import Sequilize from 'sequelize';

export default (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'Post',
    {
      username: {
        type: Sequilize.STRING(40),
        validate: {
          is: {
            args: ['^[0-9a-zA-Z\u0400-\u04FF]+$', 'i'],
            msg: 'Must be only letters and numbers',
          },
          notEmpty: { args: true, msg: 'Username cannot be empty' },
        },
        defaultValue: '',
      },
      text: {
        type: Sequilize.STRING(200),
        validate: {
          /*
          is: {
            args: ['^[0-9 a-zA-Z\u0400-\u04FFs]+$', 'i'],
            msg: 'Must be only letters and numbers',
          },
          */
          len: {
            args: [1, 200],
            msg: 'Must be less than 200 symbols',
          },
          notEmpty: { args: true, msg: 'Text cannot be empty' },
        },
        defaultValue: '',
      },
    },
    {
      timestamps: true,
    },
  );

  return Model;
};
