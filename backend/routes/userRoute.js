const express = require("express");
const routes = express.Router();

const {signUpuser , loginUser} = require('../controllers/userController')

//add user api
routes.post("/sign-up", signUpuser);

//login user api
routes.get("/login", loginUser);

module.exports = routes