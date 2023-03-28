const { getAll, create, getOne, remove, update, login, getLoggedUser} = require('../controllers/users.controllers');
const express = require('express');
const verifyJWT = require("../utils/verifyJWT");


const userR = express.Router();

userR.route('/')
    .get(verifyJWT,getAll)
    .post(create);

userR.route("/login")
.post(login);

userR.route("/me")
    .get(getLoggedUser)

userR.route('/:id')
    .get(verifyJWT,getOne)
    .delete(verifyJWT,remove)
    .put(verifyJWT,update);

module.exports = userR;