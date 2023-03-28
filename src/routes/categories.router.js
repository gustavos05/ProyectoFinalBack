const { getAll, create, getOne, remove, update } = require('../controllers/categories.controllers');
const express = require('express');
const verifyJWT = require("../utils/verifyJWT");

const categoriesR = express.Router();

categoriesR.route('/')
    .get(getAll)
    .post(verifyJWT,create);

categoriesR.route('/:id')
    .get(getOne)
    .delete(verifyJWT,remove)
    .put(update);

module.exports = categoriesR;