"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Companies", "deletedAt", {
      allowNull: true,
      type: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Companies", "deletedAt");
  },
};
