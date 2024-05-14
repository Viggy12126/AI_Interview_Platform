import express from "express";
import { addQuestions, createCourse, deleteCourse, getAllCourses, getQuestions } from "../controllers/courseController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route('/getCourses').get(getAllCourses);

router.route('/admin/createCourse').post(isAuthenticated,authorizeAdmin,createCourse);

router.route('/admin/course/:id').post(isAuthenticated,authorizeAdmin,addQuestions)
.get(isAuthenticated,authorizeAdmin,getQuestions).delete(isAuthenticated,authorizeAdmin,deleteCourse);

export default router;