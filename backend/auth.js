const express = require("express");
const router = express.Router();
require("dotenv").config();
const { UserModel } = require("./models/User");
const { generateToken } = require("./util/jwt");
const { Protect, ProtectHost } = require("./middleware");
const { Hostmodel } = require("./models/Host");
const nodemailer = require ("nodemailer");
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
      return res.status(401).json({ message: "Email not found" });
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
    });
    const token = generateToken(host._id);
    res.cookie("jwt", token, cookieOptions);
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
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await host.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(host._id);
    res.cookie("jwt", token, cookieOptions);
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

router.get("/logout", (req, res) => {
  res.clearCookie("jwt", cookieOptions);
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
router.post("/host/email/validator", async (req, res) => {
  const { email, phone="222" } = req.body;
  if (!email || email.trim() === "") {
    return res.status(400).json({ error: "No email provided" });
  }
  const exist = await Hostmodel.findOne({
    $or: [{ email }, { phone }],
  });
  console.log(exist);
  
  if(exist){
    if (exist.email === email) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (exist.phone === phone) {
      return res.status(400).json({ message: "phoneNumber already exists" });
    }
  }
  const existUser = await UserModel.findOne({
    $or: [{ email }, { phone }],
  });
  if(existUser){
    if (existUser.email === email) {
      return res.status(400).json({ message: "Email already registered as a User try with other Email" });
    }
    if (existUser.phone === phone) {
      return res.status(400).json({ message: "phoneNumber already registerd as a User try with other phoneNumber" });
    }
  }
  const otp = Math.floor(100000 + Math.random() * 900000);
  const subject = "Otp for Signup on DRIVEHUB";
  const message = `Your OTP is: ${otp}. It is valid for 10 minutes.`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text: message,
    });
    res.status(200).json({ message: "OTP sent successfully!", otp: otp});
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});
router.post("/user/email/validator", async (req, res) => {
  const { email, phone="222" } = req.body;
  if (!email || email.trim() === "") {
    return res.status(400).json({ error: "No email provided" });
  }
  const exist = await UserModel.findOne({
    $or: [{ email }, { phone }],
  });  
  if(exist){
    if (exist.email === email) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (exist.phone === phone) {
      return res.status(400).json({ message: "phoneNumber already exists" });
    }
  }
  const existUser = await Hostmodel.findOne({
    $or: [{ email }, { phone }],
  });
  if(existUser){
    if (existUser.email === email) {
      return res.status(400).json({ message: "This email is registered as a Host email" });
    }
    if (existUser.phone === phone) {
      return res.status(400).json({ message: " this phoneNumber registerd as a Host phoneNumber" });
    }
  }
  const otp = Math.floor(100000 + Math.random() * 900000);
  const subject = "Otp for Signup on DRIVEHUB";
  const message = `Your OTP is: ${otp}. It is valid for 10 minutes.`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text: message,
    });
    res.status(200).json({ message: "OTP sent successfully!", otp: otp});
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});



router.post("/user/email/forgot/validator", async (req, res) => {
  const { email} = req.body;
  if (!email || email.trim() === "") {
    return res.status(400).json({ error: "No email provided" });
  }
  const exist = await UserModel.findOne({ email });  
  if(!exist){
      return res.status(400).json({ message: "Email not exists" });
  }
  const otp = Math.floor(100000 + Math.random() * 900000);
  const subject = "Otp for Signup on DRIVEHUB";
  const message = `Your OTP is: ${otp}. It is valid for 10 minutes.`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text: message,
    });
    res.status(200).json({ message: "OTP sent successfully!", otp: otp});
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

router.post("/user/reset-password", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and new password are required" });
  }

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.password = password;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/host/email/forgot/validator", async (req, res) => {
  const { email} = req.body;
  if (!email || email.trim() === "") {
    return res.status(400).json({ error: "No email provided" });
  }
  const exist = await Hostmodel.findOne({ email });  
  if(!exist){
      return res.status(400).json({ message: "Email not exists" });
  }
  const otp = Math.floor(100000 + Math.random() * 900000);
  const subject = "Otp for Signup on DRIVEHUB";
  const message = `Your OTP is: ${otp}. It is valid for 10 minutes.`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text: message,
    });
    res.status(200).json({ message: "OTP sent successfully!", otp: otp});
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

router.post("/host/reset-password", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and new password are required" });
  }

  try {
    const Host = await Hostmodel.findOne({ email });

    if (!Host) {
      return res.status(404).json({ message: "Host not found" });
    }
    Host.password = password;
    await Host.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
