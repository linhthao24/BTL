const express = require("express");
const routers = express.Router()
const UserController = require('../controllers/UserController');
const { authMiddleWare, authUserMiddleWare } = require("../../middleware/authMiddleware");


routers.post('/signUp', UserController.CreateUser)
routers.post('/signIn', UserController.LoginUser)
routers.put('/updateUser/:id', UserController.UpdateUser)
routers.delete('/deleteUser/:id', authMiddleWare, UserController.DeleteUser)
routers.get('/getAll', authMiddleWare, UserController.GetAllUser)
routers.get('/getDetails/:id', authUserMiddleWare, UserController.GetDetailsUser)
routers.post('/refreshToken', UserController.RefreshToken)
routers.post('/logout', UserController.LogoutUser)
//routers.delete('/deleteMany', authMiddleWare, UserController.DeleteMany)

module.exports = routers