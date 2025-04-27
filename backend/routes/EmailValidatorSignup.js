const express = require("express");
const router = express.Router();
const { sendOtpForHost, sendOtpForUser } = require("../controllers/emailController");

router.post("/host/email", sendOtpForHost);
router.post("/user/email", sendOtpForUser);

module.exports = router;
