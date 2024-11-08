// routes/courseRoutes.js
import express from "express";

import { isAdmin, isAuthenticated } from "../middleware/authUser.js";
import { createCourse, deleteCourse, getAllCourses, updateCourse } from "../controller/course.controller.js";
const router = express.Router();

router.get("/allCourses",getAllCourses);
router.post('/create',isAuthenticated, isAdmin("admin"),createCourse);
router.put('/update/:id',isAuthenticated, isAdmin("admin"), updateCourse)
router.delete('/delete/:id',isAuthenticated, isAdmin("admin"), deleteCourse)


export default router;
