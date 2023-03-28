const { getAll, create, getOne, remove, update,setProductsImages } = require('../controllers/products.controllers');
const express = require('express');
const verifyJWT = require("../utils/verifyJWT");

const productsR = express.Router();

productsR.route('/')
    .get(getAll)
    .post(verifyJWT,create);

productsR.route('/:id')
    .get(getOne)
    .delete(verifyJWT,remove)
    .put(verifyJWT,update);

productsR.route('/:id/images')
    .post(verifyJWT,setProductsImages)

module.exports = productsR;