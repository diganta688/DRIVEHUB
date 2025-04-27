const { UserModel } = require("../models/User");
const { Hostmodel } = require("../models/Host");

exports.resetUserPassword = async (req, res) => {
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
};

exports.resetHostPassword = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and new password are required" });
  }

  try {
    const host = await Hostmodel.findOne({ email });

    if (!host) {
      return res.status(404).json({ message: "Host not found" });
    }
    host.password = password;
    await host.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
