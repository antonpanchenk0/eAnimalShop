const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../db');

class Customer extends Model {};

const CustomerModel = Customer.init({
    id: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING(100), allowNull: false},
    email: {type: DataTypes.STRING(255), allowNull: false},
    phone: {type: DataTypes.STRING(15), allowNull: false}
}, {sequelize});

module.exports = CustomerModel