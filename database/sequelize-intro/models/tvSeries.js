'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const TVSeries = sequelize.define(
  'TVSeries',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {}
);

module.exports = TVSeries;
