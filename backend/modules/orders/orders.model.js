const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../db');
const OrderItemModel = require('./order-item.model')

class Order extends Model{};

const OrderModel = Order.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    orderDate: {type: DataTypes.DATE, allowNull: false}
}, { sequelize });

OrderModel.items = OrderModel.hasMany(OrderItemModel, {foreignKeyConstraint: true, foreignKey: 'customerId', targetKey: 'id'});

module.exports = OrderModel;