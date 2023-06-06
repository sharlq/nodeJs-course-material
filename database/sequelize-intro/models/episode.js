'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const TvSeries = require('./tvSeries');

const Episode = sequelize.define(
  'Episode',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tvSeriesId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'episodes',
  }
);

// Define the association between Episode and TVSeries models
Episode.belongsTo(TvSeries, {
  foreignKey: 'tvSeriesId',
});
TvSeries.hasMany(Episode, {
  foreignKey: 'tvSeriesId',
});

module.exports = Episode;
