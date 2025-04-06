const express = require("express");
const router = express.Router();
require("dotenv").config();
const { UserModel } = require("../../models/User");
const { generateToken } = require("../../util/jwt");
const { Protect, ProtectHost } = require("../../middleware");
const { Hostmodel } = require("../../models/Host");
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
    res.cookie("jwtUser", token, cookieOptions);
    res.status(201).json({
      message: "User signed up successfully",
      success: true,
      redirectTo: `${process.env.FRONTEND}`,
      user: user,
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
      return res.status(401).json({ message: "Email not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user._id);
    res.cookie("jwtUser", token, cookieOptions);
    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      redirectTo: `${process.env.FRONTEND}`,
      user: user,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message});
  }
});

router.get("/home", Protect, (req, res) => {
  res.status(200).json({ message: "Welcome to the Home Page", user: req.user });
});
router.get("/user/logout", (req, res) => {
  res.clearCookie("jwtUser", cookieOptions);
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

router.post("/host/signup", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      address,
      city,
      state,
      zipCode,
      country,
      serviceArea,
      businessName,
      experience,
      description,
      lat,
      lng
    } = req.body;
    const existingHost = await Hostmodel.findOne({
      $or: [{ email }, { phone }],
    });
    if (existingHost) {
      if (existingHost.email === email) {
        return res.status(400).json({ message: "Email already exists" });
      }
      if (existingHost.phone === phone) {
        return res.status(400).json({ message: "phoneNumber already exists" });
      }
    }
    const host = await Hostmodel.create({
      name,
      email,
      password,
      phone,
      address,
      city,
      state,
      zipCode,
      country,
      serviceArea,
      businessName,
      experience,
      description,
      lat,
      lng
    });
    const token = generateToken(host._id);
    res.cookie("jwtHost", token, cookieOptions);
    res.status(201).json({
      message: "Host signed up successfully",
      success: true,
      redirectTo: `/host/home`,
      host: host
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/host/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const host = await Hostmodel.findOne({ email });
    if (!host) {
      return res.status(401).json({ message: "Email not registered" });
    }
    const isMatch = await host.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(host._id);
    res.cookie("jwtHost", token, cookieOptions);
    res.status(200).json({
      message: "Host logged in successfully",
      success: true,
      redirectTo: `/host/home`,
      host:host
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/host/home", ProtectHost, (req, res) => {
  res.status(200).json({ message: "Welcome to the Home Page", host: req.user });
});


router.get("/host/logout", (req, res) => {
  res.clearCookie("jwtHost", cookieOptions);
  res.status(200).json({ success: true, message: "Logged out successfully" });
});












module.exports = router;