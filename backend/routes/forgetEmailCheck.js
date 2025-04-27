const express = require("express");
const router = express.Router();
const { sendOtpForUser, sendOtpForHost } = require("../controllers/otpController");

router.post("/user/email/check", sendOtpForUser);
router.post("/host/email/check", sendOtpForHost);

module.exports = router;
