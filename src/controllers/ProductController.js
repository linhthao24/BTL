const ProductService = require('../services/ProductService')

const CreateProduct = async (req, res) => {
    try {
        const { name, image, type, countInStock, price, rating, description, discount } = req.body
        if (!name || !image || !type || !countInStock || !price || !rating || !discount) {
            return res.status(200).json({
                status: 'ERR',
                message: 'not enough input'
            })
        }
        const response = await ProductService.CreateProduct(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const UpdateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const data = req.body
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'not id of product'
            })
        }
        const response = await ProductService.UpdateProduct(productId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const GetDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const response = await ProductService.GetDetailsProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const DeleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const response = await ProductService.DeleteProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const GetAllProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await ProductService.GetAllProduct(Number(limit) || null, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const GetAllType = async (req, res) => {
    try {
        const response = await ProductService.GetAllType()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
module.exports = {
    CreateProduct,
    UpdateProduct,
    GetDetailsProduct,
    DeleteProduct,
    GetAllProduct,
    GetAllType,
}