'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const pagination = require('../../../lib/pagination');
const basename = path.basename(__filename);
const db = {};
const config = require("../../../config/config");


const _capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

let sequelize = new Sequelize(config.databaseInfo);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[_capitalize(model.name)] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
  pagination(db[modelName]);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
