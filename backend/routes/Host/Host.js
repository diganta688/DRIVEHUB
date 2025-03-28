const express = require("express");
const router = express.Router();
const { storage } = require("../../cloudinaryConfig");
const multer = require("multer");
const upload = multer({ storage });
const { Carmodel } = require("../../models/Car");

router.post("/cars/upload", upload.array("files", 5), async (req, res) => {
  try {
    const files = req.files.map(file => file.path);
    const newCar = new Carmodel({
      ...req.body,
      files: files,
    });

    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (error) {
    console.error(error); 
    res.status(401).json({ error: "Failed to upload car" });
  }
});

module.exports = router;
