const { UserModel } = require("../models/User");
const { Hostmodel } = require("../models/Host");
const { generateToken } = require("../util/jwt");
const isProduction = process.env.NODE_ENV === 'production';
const cookieOptions = {
  httpOnly: true,
  secure: isProduction, 
  sameSite: isProduction ? 'None' : 'Lax',
  maxAge: 24 * 60 * 60 * 1000,
};
// Helper function for user sign up
const signupUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      dob,
      address,
      city,
      state,
      zipCode,
      country,
      lng,
      lat,
      licenseExpiryDate,
    } = req.body;

    const existingUser = await UserModel.findOne({
      $or: [{ email }, { phone }],
    });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: "Email already exists" });
      }
      if (existingUser.phone === phone) {
        return res.status(400).json({ message: "Phone number already exists" });
      }
    }
    const licenseImageURL = req.file ? req.file.path : "";
    const user = await UserModel.create({
      name,
      email,
      password,
      phone,
      dob,
      address,
      city,
      state,
      zipCode,
      country,
      lng,
      lat,
      licenseImage: licenseImageURL,
      licenseExpiryDate,
    });

    const token = generateToken(user._id);
    res.cookie("jwtUser", token, cookieOptions);
    res.status(201).json({
      message: "User signed up successfully",
      success: true,
      redirectTo: `${process.env.FRONTEND}`,
      user,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Helper function for user login
const loginUser = async (req, res) => {
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
    res.status(500).json({ message: error.message });
  }
};

// Helper function for host signup
const signupHost = async (req, res) => {
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
      lng,
    } = req.body;

    const existingHost = await Hostmodel.findOne({
      $or: [{ email }, { phone }],
    });
    if (existingHost) {
      if (existingHost.email === email) {
        return res.status(400).json({ message: "Email already exists" });
      }
      if (existingHost.phone === phone) {
        return res.status(400).json({ message: "Phone number already exists" });
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
      lng,
    });

    const token = generateToken(host._id);
    res.cookie("jwtHost", token, cookieOptions);
    res.status(201).json({
      message: "Host signed up successfully",
      success: true,
      redirectTo: `/host/home`,
      host: host,
    });
  } catch (error) {
    console.error("Host signup error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Helper function for host login
const loginHost = async (req, res) => {
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
      host: host,
    });
  } catch (error) {
    console.error("Host login error:", error);
    res.status(500).json({ message: error.message });
  }
};

// User logout
const logoutUser = (req, res) => {
  res.clearCookie("jwtUser", cookieOptions);
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

// Host logout
const logoutHost = (req, res) => {
  res.clearCookie("jwtHost", cookieOptions);
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

// Home route for authenticated users
const homeUser = (req, res) => {
  res.status(200).json({ message: "Welcome to the Home Page", user: req.user });
};

// Home route for authenticated hosts
const homeHost = (req, res) => {
  res.status(200).json({ message: "Welcome to the Home Page", host: req.user });
};

module.exports = {
  signupUser,
  loginUser,
  signupHost,
  loginHost,
  logoutUser,
  logoutHost,
  homeUser,
  homeHost,
};
