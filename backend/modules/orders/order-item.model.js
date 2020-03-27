const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../db');
const AnimalModel = require('../animals/animal.model');
const OrderModel = require('./orders.model');

class OrderItem extends Model{};

const OrderItemModel = OrderItem.init({
    id: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER, allowNull: false}
}, { sequelize });

OrderItemModel.animal = OrderItemModel.belongsTo(AnimalModel, {foreignKeyConstraint: true, foreignKey: 'animalId', targetKey: 'id'});
OrderItemModel.order = OrderItemModel.belongsTo(OrderModel, {foreignKeyConstraint: true, foreignKey: 'orderId', targetKey: 'id'});

module.exports = OrderItemModel;