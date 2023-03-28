const express = require('express');
const { create, getAll } = require('../controllers/productImg.controllers') // importamos el controlador
const upload = require('../utils/multer'); // importamos del archivo creado previamente
const verifyJWT = require("../utils/verifyJWT");

const imageRoutes = express.Router();

imageRoutes.route('/')
    .get(verifyJWT,getAll)
    .post(verifyJWT,upload.single('image'), create);
//           ^^^^^^^^
//  Linea importante, colocamos el middleware upload


module.exports = imageRoutes;