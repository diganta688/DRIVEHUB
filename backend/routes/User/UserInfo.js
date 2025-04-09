const express = require("express");
const router = express.Router();
const { Carmodel } = require("../../models/Car");
const { UserModel } = require("../../models/User");
const { storage } = require("../../cloudinaryConfig");
const multer = require("multer");
const upload = multer({ storage });

router.get("/car/getAllCars", async (req, res) => {
  try {
    const cars = await Carmodel.find({});
    res.status(200).json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/car/getCarDetails/:id", async (req, res) => {
  const carId = req.params.id;
  if (!carId) {
    return res.status(400).json({ message: "Car ID is required" });
  }
  try {
    const car = await Carmodel.findById(carId).populate("host");
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json(car);
  } catch (error) {
    console.error("Error fetching car details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getUserInfo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/updateinfo/:id", async (req, res) => {
  const userId = req.params.id;
  const { name } = req.body;
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { name },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User info updated", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/updatephoto/:id", upload.single("file"), async (req, res) => {
  const userId = req.params.id;
  if (!req.file || !req.file.path) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { profilePhoto: req.file.path },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "Profile photo updated successfully",
      photoUrl: req.file.path,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating photo:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
