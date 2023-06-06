const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const User = require('./user');
const Episode = require('./episode');

const Watch = sequelize.define(
  'Watch',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    episodeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'watches',
  }
);

// Define associations
User.belongsToMany(Episode, {
  foreignKey: 'userId',
  otherKey: 'episodeId',
  through: Watch,
});
Episode.belongsToMany(User, {
  foreignKey: 'episodeId',
  otherKey: 'userId',
  through: Watch,
});

module.exports = Watch;
