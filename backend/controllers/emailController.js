const { UserModel } = require("../models/User");
const { Hostmodel } = require("../models/Host");
const nodemailer = require("nodemailer");

// Initialize nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send OTP for Host email
const sendOtpForHost = async (req, res) => {
  const { email } = req.body;
  if (!email || email.trim() === "") {
    return res.status(400).json({ error: "No email provided" });
  }

  try {
    const exist = await Hostmodel.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        message: "Email already registered as a User. Try with another email",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const subject = "OTP for Signup on DRIVEHUB";
    const message = `Your OTP is: ${otp}. It is valid for 10 minutes.`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text: message,
    });

    res.status(200).json({ message: "OTP sent successfully!", otp });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

// Function to send OTP for User email
const sendOtpForUser = async (req, res) => {
  const { email } = req.body;
  if (!email || email.trim() === "") {
    return res.status(400).json({ error: "No email provided" });
  }

  try {
    const exist = await UserModel.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const existHost = await Hostmodel.findOne({ email });
    if (existHost) {
      return res.status(400).json({ message: "This email is registered as a Host email" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const subject = "OTP for Signup on DRIVEHUB";
    const message = `Your OTP is: ${otp}. It is valid for 10 minutes.`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text: message,
    });

    res.status(200).json({ message: "OTP sent successfully!", otp });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

module.exports = {
  sendOtpForHost,
  sendOtpForUser,
};