const express = require('express');
const cartR = require('./cart.router');
const categoriesR = require('./categories.router');
const productsR = require('./products.router');
const purchaseR = require('./purchase.router');
const userR = require('./users.router');
const router = express.Router();
const imageRoutes =require('../routes/productImg.router')

// colocar las rutas aquí
router.use('/category',categoriesR);
router.use('/products',productsR);
router.use('/images',imageRoutes)
router.use('/users',userR);
router.use('/cart',cartR)
router.use('/purchased',purchaseR)

module.exports = router;