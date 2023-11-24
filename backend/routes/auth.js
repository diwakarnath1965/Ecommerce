import express from "express"
import { AllUsers, deleteUser, forgotPassword, getUserDetails, getUserProfile, loginUser, logout, registerUser, resetPassword, updatePassword, updateProfile, updateUser } from "../controllers/authController.js";
import { isAuthentiatedUser,authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logout)
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/me").get(isAuthentiatedUser,getUserProfile)
router.route("/password/update").put(isAuthentiatedUser,updatePassword)
router.route("/me/update").put(isAuthentiatedUser,updateProfile)
router.route("/admin/users").get(isAuthentiatedUser,authorizeRoles("admin"),AllUsers)
router.route("/admin/users/:id").get(isAuthentiatedUser,authorizeRoles("admin"),getUserDetails).put(isAuthentiatedUser,authorizeRoles("admin"),updateUser).delete(isAuthentiatedUser,authorizeRoles("admin"),deleteUser)


export default router