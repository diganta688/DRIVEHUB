const express = require("express");
const router = express.Router();
const razorpayController = require("../controllers/razorpayController");

router.post("/create-order", razorpayController.createOrder);
router.post("/verify-payment/:id", razorpayController.verifyPayment);

module.exports = router;
