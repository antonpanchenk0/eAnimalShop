const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../db');

class OrderItem extends Model{};

const OrderItemModel = OrderItem.init({
    orderId:{ type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
    animalId:{ type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
    quantity: {type: DataTypes.INTEGER, allowNull: false},
}, { sequelize, createdAt: false, updatedAt: false });

module.exports = OrderItemModel;