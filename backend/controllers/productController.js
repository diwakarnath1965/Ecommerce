import catchAsyncError from "../middleware/catchAsyncError.js";
import Product from "../models/product.js"
import ErrorHandler from "../utils/errorHandler.js";
// get all products 
//url = /api/v1/products

export const getProducts = catchAsyncError( async (req,res) => {

    const products = await Product.find();
    res.status(200).json({
        products,
    })
})

// create new product 
//url = /api/v1/admin/products
export const newProduct = catchAsyncError( async (req,res) => {
    const product = await Product.create(req.body)

    res.status(200).json({
        product
    })
})

// create product by id 
//url = /api/v1/products/:id
export const getproductDetails = catchAsyncError( async (req,res,next) => {
    const product = await Product.findById(req?.params?.id)

    if(!product) {
        return next(new ErrorHandler('Product not found', 404))
    }

    res.status(200).json({
        product,
    })
})

// update product by id 
//url = /api/v1/products/:id
export const updateProduct = catchAsyncError( async (req,res) => {
    let product = await Product.findById(req?.params?.id)

    if(!product) {
        return next(new ErrorHandler('Product not found', 404))
    }

    product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {new: true})

    res.status(200).json({
        product,
    })
})

// delete product by id 
//url = /api/v1/products/:id
export const deleteProduct = catchAsyncError( async (req,res) => {
    const product = await Product.findById(req?.params?.id)

    if(!product) {
        return next(new ErrorHandler('Product not found', 404))
    }

    await product.deleteOne()

    res.status(200).json({
        message: "Product Deleted"
    })
})


