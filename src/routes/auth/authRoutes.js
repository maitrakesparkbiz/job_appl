const express = require("express");
const { getLogin, postLogin } = require("../../controller/auth/authController");
const authRouter = express.Router();

const { authValidation } = require("../../middleware/validator/authValidator");
authRouter.get("/login", getLogin);
authRouter.post("/login", authValidation, postLogin);

module.exports = authRouter;
