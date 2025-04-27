const express = require("express");
const router = express.Router();
const passwordController = require("../controllers/passwordController");

// Route for resetting user password
router.post("/user/password", passwordController.resetUserPassword);

// Route for resetting host password
router.post("/host/password", passwordController.resetHostPassword);

module.exports = router;
