import express from "express"
import { getProducts, getproductDetails, newProduct, updateProduct,deleteProduct } from "../controllers/productController.js";
const router = express.Router();

router.route("/products").get(getProducts)
router.route("/admin/products").post(newProduct)
router.route("/products/:id").get(getproductDetails)
router.route("/products/:id").put(updateProduct)
router.route("/products/:id").delete(deleteProduct)

export default router