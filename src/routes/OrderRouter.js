const express = require("express");
const routers = express.Router()
const OrderController = require('../controllers/OrderController');
const { authUserMiddleWare, authMiddleWare, MiddleCancel } = require("../../middleware/authMiddleware");

// tao don hang
routers.post('/create/:id', authUserMiddleWare, OrderController.CreateOrder)
// thong tin don hang cua 1 user
routers.get('/getAllOrder/:id', authUserMiddleWare, OrderController.GetAllOrder)
// details of 1 order
routers.get('/getDetailsOrder/:id', OrderController.GetDetailsOrder)
// huy don hang
routers.delete('/cancelOrder/:id', MiddleCancel, OrderController.CancelOrder)
// admin get information of all order
routers.get('/SumOrder', authMiddleWare, OrderController.SumOrder)

module.exports = routers