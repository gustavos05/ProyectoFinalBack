const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const Category=require('./Category')

const Products = sequelize.define('products', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
Products.belongsTo(Category);
Category.hasMany(Products)

module.exports = Products;