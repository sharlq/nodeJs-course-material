'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'role', {
      type: Sequelize.ENUM('ADMIN', 'EMPLOYEE', 'NORMAL'),
      allowNull: false,
      defaultValue: 'NORMAL',
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'role');
  },
};
