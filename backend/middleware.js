require("dotenv").config();
const { UserModel } = require("./models/User");
const { verifyToken } = require("./util/jwt");
const {Hostmodel} = require("./models/Host")

exports.Protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res.status(401).json({ status: false, error: "Unauthorized" });
    const decoded = verifyToken(token);
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return res
        .status(401)
        .json({ status: false, error: "User no longer exists" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Protect middleware error:", error);
    res.clearCookie("jwt", cookieOptions);
    res.status(401).json({ status: false, error: "Invalid token" });
  }
};
exports.ProtectHost = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res.status(401).json({ status: false, error: "Unauthorized" });
    const decoded = verifyToken(token);
    const user = await Hostmodel.findById(decoded.userId);
    if (!user) {
      return res
        .status(401)
        .json({ status: false, error: "User no longer exists" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Protect middleware error:", error);
    res.clearCookie("jwt", cookieOptions);
    res.status(401).json({ status: false, error: "Invalid token" });
  }
};
