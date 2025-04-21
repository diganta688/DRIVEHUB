const express = require("express");
const router = express.Router();
const { Carmodel } = require("../../models/Car");
const { UserModel } = require("../../models/User");
const { Hostmodel } = require("../../models/Host");
const NotificationModel = require("../../models/Notifications");
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
    const user = await UserModel.findById(id).populate("RentHistory");
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

router.put("/update-location/:id", async (req, res) => {
  const { id } = req.params;
  const {
    address,
    city,
    state,
    zipCode,
    country,
    lat,
    lng,
    name,
    email,
    phone,
    licenseExpiryDate,
  } = req.body;

  try {
    const hostExist = await Hostmodel.findOne({ email: email });
    if (hostExist) {
      return res.status(401).json({
        success: false,
        message: "Email is already registered as a host",
      });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        $set: {
          address,
          city,
          state,
          zipCode,
          country,
          lat,
          lng,
          phone,
          name,
          email,
          licenseExpiryDate,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Information updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating location:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/bookcarforuser/:userId/:carId", async (req, res) => {
  const { userId, carId } = req.params;
  const carInfo = req.body;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const car = await Carmodel.findById(carId);
    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }
    user.RentHistory.push(car);
    car.available = false;
    car.availableSituation = "pending";
    car.userStartDate = carInfo.userStartDate;
    car.userStartTime = carInfo.userStartTime;
    car.userEndDate = carInfo.userEndDate;
    car.userEndTime = carInfo.userEndTime;
    await user.save();
    await car.save();
    const Host = await Hostmodel.findById(car.host);
    let notificationModel = await NotificationModel.create({
      userId: user,
      carId: car,
      bookingStatus: "pending",
      userStartDate: carInfo.userStartDate,
      userEndDate: carInfo.userEndDate,
      userStartTime: carInfo.userStartTime,
      userEndTime: carInfo.userEndTime,
      message: "Booking",
    });
    Host.notifications.push(notificationModel);
    await Host.save();
    return res
      .status(200)
      .json({
        success: true,
        message: "Booking updated successfully",
        user: user,
        car: car,
      });
  } catch (error) {
    console.error("Error while booking car for user:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
