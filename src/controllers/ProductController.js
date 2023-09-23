const ProductService = require('../services/ProductService')
const asyncHandler = require('express-async-handler')
const Product = require('../models/ProductModel')

const UploadImage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({
            status: 'ERR',
            message: 'No images uploaded'
        });
    }

    const imagePaths = req.files.map(file => file.path);

    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Product not found'
            });
        }
        product.image = [];
        product.image = product.image.concat(imagePaths);
        await product.save();

        return res.status(200).json({
            status: 'OK',
            message: 'Images uploaded successfully',
            images: imagePaths
        });
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message
        });
    }
});


const CreateProduct = async (req, res) => {
    try {
        const { name, type, countInStock, price, rating, description, discount } = req.body
        if (!name || !type || !countInStock || !price || !rating || !discount) {
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
const GetByType = async (req, res) => {
    try {
        const type = req.params.type;

        if (!type) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Type is required',
            });
        }

        const response = await ProductService.GetByType(type);

        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message,
        });
    }
}
module.exports = {
    CreateProduct,
    UpdateProduct,
    GetDetailsProduct,
    DeleteProduct,
    GetAllProduct,
    GetAllType,
    UploadImage,
    GetByType
}
