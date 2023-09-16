const express = require("express");
const routers = express.Router()
const ProductController = require('../controllers/ProductController');
const { authMiddleWare } = require("../../middleware/authMiddleware");


// tạo thêm sản phẩm: các trường dữ liệu cần điền được mô tả trong productmodel
routers.post('/create', ProductController.CreateProduct)
// cập nhật thông tin sản phẩm chỉ admin
routers.put('/update/:id', authMiddleWare, ProductController.UpdateProduct)
// Lấy thông tin chi tiết từng sản phẩm
routers.get('/getDetails/:id', ProductController.GetDetailsProduct)
// xóa sản phẩm, chỉ có amin
routers.delete('/delete/:id', authMiddleWare, ProductController.DeleteProduct)
// lấy thông tin tất cả sản phẩm
routers.get('/getAll', ProductController.GetAllProduct)
// lấy thông tin loại của từng sản phẩm
routers.get('/getAllType', ProductController.GetAllType)

module.exports = routers
