const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../db');

class Animal extends Model{};

const AnimalModel = Animal.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    species: {type: DataTypes.STRING(255), allowNull: false},
    name: {type: DataTypes.STRING(255), allowNull: false},
    price: {type: DataTypes.DECIMAL(11, 2), allowNull: false},
    gender: {type: DataTypes.STRING(6), allowNull: false},
    image: {type: DataTypes.STRING(255), allowNull: false},
    weight: {type: DataTypes.DECIMAL(6,2), allowNull: false},
    birth_date: {type: DataTypes.DATEONLY, allowNull: false},
    color: {type: DataTypes.STRING(25), allowNull: false},
    breed: {type: DataTypes.STRING(50), allowNull: false},
    is_sterile: {type: DataTypes.BOOLEAN, allowNull: false},
    hair: {type: DataTypes.STRING(15), allowNull: false}
}, { sequelize });

module.exports = AnimalModel;