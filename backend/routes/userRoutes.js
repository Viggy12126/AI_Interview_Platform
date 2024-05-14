import express from "express";
import { getAllUsers, getMyProfile, login, logout, register, updateUserRole } from "../controllers/userController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route('/register').post(register);

router.route('/login').post(login);

router.route('/logout').get(logout);

router.route('/getprofile').get(isAuthenticated,getMyProfile)

router.route('/admin/users').get(isAuthenticated,authorizeAdmin,getAllUsers);

router.route('/admin/user/:id').put(isAuthenticated,authorizeAdmin,updateUserRole);

export default router;