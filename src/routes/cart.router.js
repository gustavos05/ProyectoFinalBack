const { getAll, create, getOne, remove, update } = require('../controllers/cart.controllers');
const express = require('express');
const verifyJWT = require("../utils/verifyJWT");

const cartR = express.Router();

cartR.route('/')
    .get(verifyJWT,getAll)
    .post(verifyJWT,create);

cartR.route('/:id')
    .get(verifyJWT,getOne)
    .delete(verifyJWT,remove)
    .put(verifyJWT,update);

module.exports = cartR;