require("dotenv").config();
const { UserModel } = require("./models/User");
const { verifyToken } = require("./util/jwt");
const {Hostmodel} = require("./models/Host")

exports.Protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwtUser;
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
    res.clearCookie("jwtUser", cookieOptions);
    res.status(401).json({ status: false, error: "Invalid token" });
  }
};
exports.ProtectHost = async (req, res, next) => {
  try {
    const token = req.cookies.jwtHost;
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
    res.clearCookie("jwtHost", cookieOptions);
    res.status(401).json({ status: false, error: "Invalid token" });
  }
};
