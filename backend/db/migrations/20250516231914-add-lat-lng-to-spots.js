'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    // Add `lat` column to Spots
    await queryInterface.addColumn(
      'Spots',          // name of Source model
      'lat',            // name of the new column
      {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0
      },
      options           // pass schema in production
    );

    // Add `lng` column to Spots
    await queryInterface.addColumn(
      'Spots',
      'lng',
      {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0
      },
      options
    );
  },

  async down(queryInterface, Sequelize) {
    // Remove columns in reverse order
    await queryInterface.removeColumn(
      'Spots',
      'lat',
      options
    );
    await queryInterface.removeColumn(
      'Spots',
      'lng',
      options
    );
  }
};