const express = require("express");
const routers = express.Router()
const OrderController = require('../controllers/OrderController');
const { authUserMiddleWare, authMiddleWare } = require("../../middleware/authMiddleware");

routers.post('/create/:id', authUserMiddleWare, OrderController.CreateOrder)
routers.get('/get-all-order/:id', authUserMiddleWare, OrderController.GetAllOrder)
routers.get('/get-details-order/:id', OrderController.GetDetailsOrder)
routers.delete('/cancel-order/:id', authUserMiddleWare, OrderController.CancelOrder)
routers.get('/SumOrder', authMiddleWare, OrderController.SumOrder)

module.exports = routers