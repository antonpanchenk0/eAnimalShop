'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Customers', {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name:{
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      email:{
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      phone:{
        allowNull: false,
        type: Sequelize.STRING(15)
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Customers');
  }
};
