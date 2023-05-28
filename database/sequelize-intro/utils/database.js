const Sequelize = require('sequelize');

const sequelize = new Sequelize('first-database', 'root', 'admin', {
  dialect: 'mysql',
  host: 'localhost',
  port: '3307',
});

module.exports = sequelize;
