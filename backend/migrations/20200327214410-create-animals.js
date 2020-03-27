'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Animals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      species: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(11,2)
      },
      gender: {
        allowNull: false,
        type: Sequelize.STRING(6)
      },
      weight: {
        allowNull: false,
        type: Sequelize.DECIMAL(11,2)
      },
      birth_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      color: {
        allowNull: false,
        type: Sequelize.STRING(25)
      },
      breed: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      is_sterile: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      hair: {
        allowNull: false,
        type: Sequelize.STRING(15)
      },
      description: {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.TEXT
      },
      quantity: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Animals');
  }
};