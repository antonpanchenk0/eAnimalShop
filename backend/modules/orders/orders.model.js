const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../db');
const AnimalModel = require('../animals/animal.model');
const OrderItemModel = require('./order-item.model');
const CustomerModel = require('../customers/customers.model');

class Order extends Model{};

const OrderModel = Order.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    orderPrice: {type: DataTypes.DECIMAL(20,2), allowNull: false },
    createdAt: {type: DataTypes.DATE, allowNull: false},
    updatedAt: {type: DataTypes.DATE, allowNull: false}
}, { sequelize });


OrderModel.hasMany(OrderItemModel, { foreignKey: 'orderId', as: 'items' });
OrderModel.hasOne(CustomerModel, { foreignKeyConstraint: true, foreignKey: 'orderId', as: 'сustomer' });


OrderItemModel.animal = OrderItemModel.belongsTo(AnimalModel, {foreignKeyConstraint: true, foreignKey: 'animalId', targetKey: 'id'});

module.exports = OrderModel;