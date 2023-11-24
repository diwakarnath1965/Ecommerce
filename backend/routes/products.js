import express from "express"
import { getProducts, getproductDetails, newProduct, updateProduct,deleteProduct } from "../controllers/productController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";
const router = express.Router();

router.route("/products").get(getProducts)
router.route("/admin/products").post(isAuthenticatedUser,authorizeRoles("admin"),newProduct)
router.route("/products/:id").get(getproductDetails)
router.route("/admin/products/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
router.route("/admin/products/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)

export default router