const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    totalAmount: {type: DataTypes.FLOAT, allowNull: false},
    status: {type: DataTypes.ENUM('pending', 'completed', 'cancelled'), defaultValue: 'pending'}
});

module.exports = Order;
