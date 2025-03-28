const express = require("express");
const router = express.Router();
require("dotenv").config();
const { UserModel } = require("../../models/User");
const { Hostmodel } = require("../../models/Host");

router.post("/user/password", async (req, res) => {
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
  
  
  router.post("/host/password", async (req, res) => {
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