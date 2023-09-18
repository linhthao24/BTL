const express = require("express");
const routers = express.Router()
const ProductController = require('../controllers/ProductController');
const { authMiddleWare } = require("../../middleware/authMiddleware");
const uploader = require('../cloudinaryConfig')



routers.put('/upImage/:id', uploader.array('images', 10), authMiddleWare, ProductController.UploadImage)

routers.post('/create', ProductController.CreateProduct)
routers.put('/update/:id', authMiddleWare, ProductController.UpdateProduct)
routers.get('/getDetails/:id', ProductController.GetDetailsProduct)
routers.delete('/delete/:id', authMiddleWare, ProductController.DeleteProduct)
routers.get('/getAll', ProductController.GetAllProduct)
routers.get('/getAllType', ProductController.GetAllType)

module.exports = routers