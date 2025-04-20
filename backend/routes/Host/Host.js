const express = require("express");
const router = express.Router();
const { storage } = require("../../cloudinaryConfig");
const multer = require("multer");
const upload = multer({ storage });
const { Carmodel } = require("../../models/Car");
const { Hostmodel } = require("../../models/Host");

router.post("/cars/upload/:id", upload.fields([
  { name: "MainImage", maxCount: 1 },
  { name: "files", maxCount: 5 },
  { name: "insuranceDocument", maxCount: 1 },
  { name: "pollutionCertificate", maxCount: 1 },
  { name: "rcBook", maxCount: 1 }
]), async (req, res) => {
  try {
    const hostId = req.params.id;
    const host = await Hostmodel.findById(hostId);
    if (!host) return res.status(404).json({ error: "Host not found" });
    const mainImagePath = req.files["MainImage"] ? req.files["MainImage"][0].path : null;
    const additionalFiles = req.files["files"] ? req.files["files"].map(file => file.path) : [];
    const insuranceDocumentPath = req.files["insuranceDocument"] ? req.files["insuranceDocument"][0].path : null;
    const pollutionCertificatePath = req.files["pollutionCertificate"] ? req.files["pollutionCertificate"][0].path : null;
    const rcBookPath = req.files["rcBook"] ? req.files["rcBook"][0].path : null;
    const newCar = new Carmodel({
      ...req.body,
      MainImage: mainImagePath,
      insuranceDocument: insuranceDocumentPath,
      pollutionCertificate: pollutionCertificatePath,
      rcBook: rcBookPath,
      files: additionalFiles,
      host: host._id
    });
    await newCar.save();
    host.cars.push(newCar._id);
    await host.save();
    res.status(201).json(newCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload car" });
  }
});


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
  } catch (error) {
    
  }
});
router.post('/:carId/car-update', async (req, res) => {
  const { carId } = req.params;
  const updatedData = req.body;
  try {
    const updatedCar = await Carmodel.findByIdAndUpdate(carId, updatedData, { new: true });
    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json({ message: "Car updated successfully", car: updatedCar });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
