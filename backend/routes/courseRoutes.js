import express from "express";
import { addQuestions, createCourse, deleteCourse, getAllCourses, getQuestions, postFeedback, speechToText } from "../controllers/courseController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route('/getCourses').get(getAllCourses);
router.route('/feedback').post(postFeedback);

router.route('/admin/createCourse').post(isAuthenticated,authorizeAdmin,createCourse);

router.route('/course/:id').get(isAuthenticated,getQuestions);

router.route('/course/:id').post(isAuthenticated,speechToText);

router.route('/admin/course/:id').post(isAuthenticated,authorizeAdmin,addQuestions).delete(isAuthenticated,authorizeAdmin,deleteCourse);

export default router;