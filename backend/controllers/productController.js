import Product from "../models/product.js"

// get all products 
//url = /api/v1/products

export const getProducts = async (req,res) => {

    const products = await Product.find();
    res.status(200).json({
        products,
    })
}

// create new product 
//url = /api/v1/admin/products
export const newProduct = async (req,res) => {
    const product = await Product.create(req.body)

    res.status(200).json({
        product
    })
}

// create product by id 
//url = /api/v1/products/:id
export const getproductDetails = async (req,res) => {
    const product = await Product.findById(req?.params?.id)

    if(!product) {
        return res.status(404).json({
            error: "Product not found"
        })
    }

    res.status(200).json({
        product,
    })
}

// update product by id 
//url = /api/v1/products/:id
export const updateProduct = async (req,res) => {
    let product = await Product.findById(req?.params?.id)

    if(!product) {
        return res.status(404).json({
            error: "Product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {new: true})

    res.status(200).json({
        product,
    })
}

// delete product by id 
//url = /api/v1/products/:id
export const deleteProduct = async (req,res) => {
    const product = await Product.findById(req?.params?.id)

    if(!product) {
        return res.status(404).json({
            error: "Product not found"
        })
    }

    await product.deleteOne()

    res.status(200).json({
        message: "Product Deleted"
    })
}


