const sequelize = require('../config/database');
const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Setting = require('./Setting');

//Associations of Product and Category
Category.hasMany(Product, {foreignKey: 'categoryId'});
Product.belongsTo(Category, {foreignKey: 'categoryId'});

//Associations of Order and User
User.hasMany(Order, {foreignKey: 'userId'});
Order.belongsTo(User, {foreignKey: 'userId'});

//Associations of OrderItem and Order/Product
Order.hasMany(OrderItem, {foreignKey: 'orderId'});
OrderItem.belongsTo(Order, {foreignKey: 'orderId'});

Product.hasMany(OrderItem, {foreignKey: 'productId'});
OrderItem.belongsTo(Product, {foreignKey: 'productId'});

module.exports = {
    sequelize,
    User,
    Category,
    Product,
    Order,
    OrderItem,
    Setting
};

