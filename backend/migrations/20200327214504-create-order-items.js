'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('OrderItems', {
      orderId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:{
            tableName: 'Orders',
            key: 'id',
          }
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      animalId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:{
            tableName: 'Animals',
            key: 'id',
          }
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      quantity:{
        allowNull: false,
        type: Sequelize.INTEGER
      },
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('OrderItems');
  }
};
