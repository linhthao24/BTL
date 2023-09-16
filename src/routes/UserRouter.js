const express = require("express");
const routers = express.Router()
const UserController = require('../controllers/UserController');
const { authMiddleWare, authUserMiddleWare } = require("../../middleware/authMiddleware");// lần lượt là xác thực admin, người dùng

// đăng ký thông tin người dùng: name, email, password, confirmPassword, phone
routers.post('/signUp', UserController.CreateUser)
// đăng nhập thông tin người dùng: email, password
routers.post('/signIn', UserController.LoginUser)
// update thông tin_id người dùng: 
routers.put('/updateUser/:id', UserController.UpdateUser)
// xóa thông tin người dùng, chỉ có admin mới có quyền xóa phải qua bước xác thực bên header: token beare access_token
routers.delete('/deleteUser/:id', authMiddleWare, UserController.DeleteUser)
// Lấy tất cả thông tin của người dùng chỉ admin mới có quyền này
routers.get('/getAll', authMiddleWare, UserController.GetAllUser)
// Lấy thông tin chi tiết của từng người (cả admin và user)
routers.get('/getDetails/:id', authUserMiddleWare, UserController.GetDetailsUser)
// Gia hạn lại thời gian của tài khoản
routers.post('/refreshToken', UserController.RefreshToken)
// đăng xuất
routers.post('/logout', UserController.LogoutUser)
//routers.delete('/deleteMany', authMiddleWare, UserController.DeleteMany)

module.exports = routers
