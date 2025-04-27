const express = require("express");
const router = express.Router();
const { storage } = require("../cloudinaryConfig");
const multer = require("multer");
const upload = multer({ storage });
const { Protect, ProtectHost } = require("../middleware");
const {
  signupUser,
  loginUser,
  signupHost,
  loginHost,
  logoutUser,
  logoutHost,
  homeUser,
  homeHost,
} = require("../controllers/authController");

router.post("/signup", upload.single("licenseImage"), signupUser);
router.post("/login", loginUser);
router.get("/home", Protect, homeUser);
router.get("/user/logout", logoutUser);

router.post("/host/signup", signupHost);
router.post("/host/login", loginHost);
router.get("/host/home", ProtectHost, homeHost);
router.get("/host/logout", logoutHost);

module.exports = router;
