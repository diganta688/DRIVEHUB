const express = require("express");
const router = express.Router();
const { storage } = require("../../cloudinaryConfig");
const multer = require("multer");
const upload = multer({ storage });
const { Carmodel } = require("../../models/Car");
const { Hostmodel } = require("../../models/Host");
const NotificationModel = require("../../models/Notifications");

router.post(
  "/cars/upload/:id",
  upload.fields([
    { name: "MainImage", maxCount: 1 },
    { name: "files", maxCount: 5 },
    { name: "insuranceDocument", maxCount: 1 },
    { name: "pollutionCertificate", maxCount: 1 },
    { name: "rcBook", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const hostId = req.params.id;
      const host = await Hostmodel.findById(hostId);
      if (!host) return res.status(404).json({ error: "Host not found" });
      const mainImagePath = req.files["MainImage"]
        ? req.files["MainImage"][0].path
        : null;
      const additionalFiles = req.files["files"]
        ? req.files["files"].map((file) => file.path)
        : [];
      const insuranceDocumentPath = req.files["insuranceDocument"]
        ? req.files["insuranceDocument"][0].path
        : null;
      const pollutionCertificatePath = req.files["pollutionCertificate"]
        ? req.files["pollutionCertificate"][0].path
        : null;
      const rcBookPath = req.files["rcBook"]
        ? req.files["rcBook"][0].path
        : null;
      const newCar = new Carmodel({
        ...req.body,
        MainImage: mainImagePath,
        insuranceDocument: insuranceDocumentPath,
        pollutionCertificate: pollutionCertificatePath,
        rcBook: rcBookPath,
        files: additionalFiles,
        host: host,
      });
      await newCar.save();
      host.cars.push(newCar._id);
      await host.save();
      res.status(201).json(newCar);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to upload car" });
    }
  }
);

router.post("/updateinfo/:id", async (req, res) => {
  const userId = req.params.id;
  const { name } = req.body;
  try {
    const updatedUser = await Hostmodel.findByIdAndUpdate(
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
    const updatedUser = await Hostmodel.findByIdAndUpdate(
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

router.post("/cars/get/:id", async (req, res) => {
  try {
    const hostId = req.params;
    const host = await Hostmodel.findById(hostId.id).populate("cars");
    if (!host) {
      return res.status(401).json({ error: "Host not found" });
    }
    res.status(200).json({ cars: host.cars });
  } catch (error) {}
});
router.post("/:carId/car-update", async (req, res) => {
  const { carId } = req.params;
  const updatedData = req.body;
  try {
    const updatedCar = await Carmodel.findByIdAndUpdate(carId, updatedData, {
      new: true,
    });
    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found" });
    }
    res
      .status(200)
      .json({ message: "Car updated successfully", car: updatedCar });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/get-car-user/notification/:id", async (req, res) => {
  const notification = await NotificationModel.findById(req.params.id)
    .populate("userId")
    .populate("carId");
  res.json(notification);
});

router.post("/cars/activeStatus/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      status,
      notificationId = "680642ea375b8e257e8fab03",
      hostId = "680642ea375b8e257e8fab03",
      totalAmmount = 0,
    } = req.body;
    const car = await Carmodel.findById(id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    const notification = await NotificationModel.findById(notificationId);
    const host = await Hostmodel.findById(hostId);
    if (status === true) {
      car.available = true;
      car.availableSituation = "active";
    } else if (status === false) {
      car.available = false;
      car.availableSituation = "diactive";
    } else if (status === "booked") {
      car.available = false;
      car.availableSituation = "booked";
      notification.bookingStatus = "booked";
      host.Earnings = (host.Earnings+totalAmmount)-500;
      await notification.save();
      await host.save();
    } else if (status === "canceled") {
      car.available = true;
      car.availableSituation = "active";
      await NotificationModel.findByIdAndDelete(notificationId);
    } else {
      return res.status(400).json({ message: "Invalid status" });
    }
    await car.save();
    res.status(200).json({
      message:
        status === true
          ? "Car activated"
          : status === false
          ? "Car deactivated"
          : `Car marked as ${status}`,
      car: car,
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Updation failed" });
  }
});

module.exports = router;
