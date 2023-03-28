const { getAll, create } = require('../controllers/purchase.controllers');
const express = require('express');
const verifyJWT = require("../utils/verifyJWT");

const purchaseR = express.Router();

purchaseR.route('/')
    .get(verifyJWT,getAll)
    .post(verifyJWT,create);


module.exports = purchaseR;