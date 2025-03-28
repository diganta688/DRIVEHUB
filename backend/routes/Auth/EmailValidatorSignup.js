const express = require("express");
const router = express.Router();
require("dotenv").config();
const { UserModel } = require("../../models/User");
const { Hostmodel } = require("../../models/Host");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/host/email", async (req, res) => {
  const { email } = req.body;
  if (!email || email.trim() === "") {
    return res.status(400).json({ error: "No email provided" });
  }
  const exist = await Hostmodel.findOne({
    $or: [{ email }],
  });

  if (exist) {
    if (exist.email === email) {
      return res.status(400).json({ message: "Email already exists" });
    }
  }
  const existUser = await UserModel.findOne({
    $or: [{ email }],
  });
  if (existUser) {
    if (existUser.email === email) {
      return res
        .status(400)
        .json({
          message: "Email already registered as a User try with other Email",
        });
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
    res.status(200).json({ message: "OTP sent successfully!", otp: otp });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});
router.post("/user/email", async (req, res) => {
  const { email } = req.body;
  if (!email || email.trim() === "") {
    return res.status(400).json({ error: "No email provided" });
  }
  const exist = await UserModel.findOne({
    $or: [{ email }],
  });
  if (exist) {
    if (exist.email === email) {
      return res.status(400).json({ message: "Email already exists" });
    }
  }
  const existUser = await Hostmodel.findOne({
    $or: [{ email }],
  });
  if (existUser) {
    if (existUser.email === email) {
      return res
        .status(400)
        .json({ message: "This email is registered as a Host email" });
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
    res.status(200).json({ message: "OTP sent successfully!", otp: otp });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

module.exports = router;