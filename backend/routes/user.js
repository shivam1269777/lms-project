import { Router } from "express";
import {register,login,logout,getProfile,forgot,reset,changePassword,updateUser} from "../controllers/userController.js"
import { isLoggedin } from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";
const router=Router();

router.post('/register',upload.single("avatar"),register);
router.post('/login',login);
router.get('/logout',logout)
router.get("/me",isLoggedin,getProfile);
router.post('/forgot-password', forgot); // send reset token
router.post('/reset-password/:resetToken', reset); // reset with token
router.post("/change-password",isLoggedin,changePassword);
router.put("/update/:id", isLoggedin, upload.single("avatar"), updateUser);
export default router;