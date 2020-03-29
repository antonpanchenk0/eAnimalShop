const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../db');
const AnimalModel = require('../animals/animal.model');
const OrderItemModel = require('./order-item.model');

class Order extends Model{};

const OrderModel = Order.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    orderPrice: {type: DataTypes.DECIMAL(20,2), allowNull: false },
    createdAt: {type: DataTypes.DATE, allowNull: false},
    updatedAt: {type: DataTypes.DATE, allowNull: false}
}, { sequelize });


OrderModel.items = OrderModel.hasMany(OrderItemModel, {foreignKeyConstraint: true, foreignKey: 'customerId', targetKey: 'id'});


OrderItemModel.animal = OrderItemModel.belongsTo(AnimalModel, {foreignKeyConstraint: true, foreignKey: 'animalId', targetKey: 'id'});
OrderItemModel.order = OrderItemModel.belongsTo(OrderModel, {foreignKeyConstraint: true, foreignKey: 'orderId', targetKey: 'id'});

module.exports = OrderModel;