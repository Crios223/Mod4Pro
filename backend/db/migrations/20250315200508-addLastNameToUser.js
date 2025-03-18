"use strict";

const { sequelize } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      { tableName: "Users", schema: options.schema }, // Use schema if needed
      "lastName", // Column name
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "", // Provide a default value for existing records
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      { tableName: "Users", schema: options.schema }, // Use schema if needed
      "lastName" // Column name
    );
  },
};