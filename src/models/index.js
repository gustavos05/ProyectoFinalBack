const Cart = require("./Cart");
const Category = require("./Category");
const Products = require("./Product");
const Users = require("./Users");
const ProductImg=require('./ProductImg')
const Purchase=require('./Purchase')


Products.belongsTo(Category);
Category.hasMany(Products);

Cart.belongsTo(Products);
Products.hasMany(Cart);

Cart.belongsTo(Users);
Users.hasMany(Cart);


ProductImg.belongsTo(Products);
Products.hasMany(ProductImg);


Purchase.belongsTo(Products);
Products.hasMany(Purchase);

Purchase.belongsTo(Users);
Users.hasMany(Purchase);
