import mongoose from "mongoose";
import products from "./data.js"
import Product from "../models/product.js"


const seedProducts = async () => {
    try {
        await mongoose.connect("mongodb+srv://diwakarnath51:Nd7042967754@ecommerce.qkeji0c.mongodb.net/ecommerce?retryWrites=true&w=majority")

        await Product.deleteMany();
        console.log("Products are deleted successfully");

        await Product.insertMany(products)
        console.log("Products are added successfully");

        process.exit()
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedProducts();