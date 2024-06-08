import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { buySubscription, getRazorPayKey, paymentVerification } from "../controllers/paymentController.js";

const router = express.Router();

router.route("/subscribe").get(isAuthenticated,buySubscription)

router.route("/razorpaykey").get(isAuthenticated,getRazorPayKey);

router.route("/paymentverification").post(isAuthenticated,paymentVerification);

export default router;