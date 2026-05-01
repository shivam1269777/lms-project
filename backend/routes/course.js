import {Router} from "express";
import { getAllCourses, getLectureByCourseId,createCourse,updateCourse,removeLectureFromCourse,addLectureToCourseById} from "../controllers/courseController.js";
import { authorizedRoles, authorizedSubscriber, isLoggedin } from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";
const router=Router();

router.route("/").get(getAllCourses).post(isLoggedin,authorizedRoles("ADMIN"),upload.single("thumbnail"),createCourse) .delete(isLoggedin, authorizedRoles('ADMIN'), removeLectureFromCourse);;
router.route("/:id").get(isLoggedin,authorizedSubscriber,getLectureByCourseId).put(isLoggedin,authorizedRoles('ADMIN'),updateCourse).post(isLoggedin,authorizedRoles('ADMIN'),  upload.single('lecture'),addLectureToCourseById);
export default router;
