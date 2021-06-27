const Product = require('./../models/Product');
const catchAsyncError = require('./../middlewares/catchAsyncError');
const ErrorHandler = require('./../utils/ErrorHandler');
const cloudinary = require('cloudinary');

const productControllers = {
    getAllProduct: catchAsyncError(async (req, res, next) => {
        const products = await Product.find();
        return res.status(200).json({
            success: true,
            products
        })
    }),
    getSpecificProduct: catchAsyncError(async (req, res, next) => {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product)
            return next(new ErrorHandler('Product not found!', 404));
        return res.status(200).json({
            success: true,
            product
        })
    }),
    addProduct: catchAsyncError(async (req, res, next) => {
        const { title, stock, price } = req.body;
        if (!title || !stock || !price)
            return next(new ErrorHandler('Please provide every field!', 400));

        const newProduct = {
            title,
            stock,
            price
        }

        let images = [];
        if (typeof req.body.productImage === 'string') {
            images.push(req.body.productImage);
        } else {
            images = req.body.productImage;
        }

        let imagesLink = [];
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'bigproject/products'
            });
            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        newProduct.image = imagesLink;

        const product = new Product(newProduct);
        await product.save();

        return res.status(200).json({
            success: true,
            product
        });
    })
}

module.exports = productControllers;