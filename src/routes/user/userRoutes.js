const express = require('express');
const userRouter = express.Router();
const { getAllUsers } = require('../../controller/user/userController');
const { userValidation } = require('../../middleware/validator/userValidator');

userRouter.get('/users', userValidation, getAllUsers);

module.exports = userRouter;
