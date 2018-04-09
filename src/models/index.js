import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../config';

const basename = path.basename(__filename);
let db = {};

const sequelize = new Sequelize(
  config.db_name,
  config.db_user,
  config.db_password,
  {
    host: config.db_host,
    dialect: config.db_dialect,
    port: config.db_port,
    storage: config.db_storage,
    operatorsAliases: false,
  },
);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
