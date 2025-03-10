const express = require("express");
const router = express.Router();
require("dotenv").config();
const { UserModel } = require("./models/User");
const { generateToken } = require("./util/jwt");
const { Protect } = require("./middleware");

const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
};


router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phone, dob } = req.body;    
    const existingUser = await UserModel.findOne({
      $or: [{ email }, { phone }],
    });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: "Email already exists" });
      }
      if (existingUser.phone === phone) {
        return res.status(400).json({ message: "phoneNumber already exists" });
      }
    }
    const user = await UserModel.create({
      name,
      email,
      password,
      phone,
      dob,
    });
    const token = generateToken(user._id);
    res.cookie("jwt", token, cookieOptions);
    res.status(201).json({
      message: "User signed up successfully",
      success: true,
        redirectTo: `${process.env.FRONTEND}`,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: error.message });
  }

});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user._id);
    res.cookie("jwt", token, cookieOptions);
    res.status(200).json({
      message: "User logged in successfully",
      success: true,
        redirectTo: `${process.env.FRONTEND}`,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/home", Protect, (req, res) => {
  res.status(200).json({ message: "Welcome to the Home Page" });
});
router.get("/logout", (req, res) => {
  res.clearCookie("jwt", cookieOptions);
  res.status(200).json({ success: true, message: "Logged out successfully" });
});


module.exports = router;    