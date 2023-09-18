const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const Order = require('../src/models/OrderProduct')
const User = require('../src/models/UserModel')
dotenv.config()

const authMiddleWare = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'token is fail',
                status: 'ERROR'
            })
        }
        const { payload } = user
        if (payload?.isAdmin) {
            next()
        } else {
            return res.status(404).json({
                message: 'you are not admin',
                status: 'ERROR'
            })
        }
    });
}

const authUserMiddleWare = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    const userId = req.params.id
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'token is fail',
                status: 'ERROR'
            })
        }
        const { payload } = user
        console.log(payload)
        console.log(userId)
        if (payload?.isAdmin || payload?.id === userId) {
            next()
        } else {
            return res.status(404).json({
                message: 'error id',
                status: 'ERROR'
            })
        }
    });
}
const MiddleCancel = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    const orderId = req.params.id;
    if (!token) {
        return res.status(401).json({
            message: 'Token is missing',
            status: 'ERROR'
        });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, async function (err, user) {
        if (err) {
            return res.status(401).json({
                message: 'Token is invalid',
                status: 'ERROR'
            });
        }
        const { payload } = user;
        try {
            // get information of order 
            const order = await Order.findById(orderId);
            //console.log(order)
            if (!order) {
                return res.status(404).json({
                    message: 'Order not found',
                    status: 'ERROR'
                });
            }
            //console.log(order.user.toString())
            if (payload.isAdmin || payload.id === order.user.toString()) {
                next();
            } else {
                return res.status(403).json({
                    message: 'Access denied',
                    status: 'ERROR'
                });
            }
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                status: 'ERROR'
            });
        }
    });
}
module.exports = {
    authMiddleWare,
    authUserMiddleWare,
    MiddleCancel,
}