import {Router} from "express";
import { allPayments, buySubscription, cancelSubscription, getRazorpayApiKey, verifySubscription } from "../controllers/paymentController.js";
import { authorizedRoles, isLoggedin } from "../middleware/authMiddleware.js";
const router=Router();

router.route("/razorpay-key").get(isLoggedin,getRazorpayApiKey);

router.route("/subscribe").post(isLoggedin,buySubscription);
router.route("/verify").post(isLoggedin,verifySubscription);
router.route("/unsubscribe").post(isLoggedin,cancelSubscription);
router.route('/').get(isLoggedin,authorizedRoles("ADMIN"),allPayments);
export default router;