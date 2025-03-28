const express = require("express");
const router = express.Router();
const { storage } = require("../../cloudinaryConfig");
const multer = require("multer");
const upload = multer({ storage });
const { Carmodel } = require("../../models/Car");
const { Hostmodel } = require("../../models/Host");

router.post("/cars/upload/:id", upload.array("files", 5), async (req, res) => {
  try {
    const hostId = req.params.id;
    const host = await Hostmodel.findById(hostId);

    if (!host) {
      return res.status(401).json({ error: "Host not found" });
    }
    if (host.cars.length >= 2 ) {
      return res.status(401).json({ 
        error: "Free tier limit reached. Upgrade to premium to list more cars." 
      });
    }
    const files = req.files.map(file => file.path);
    const newCar = new Carmodel({
      ...req.body,
      imageUrls: files
    });
    await newCar.save();

    host.cars.push(newCar._id);
    await host.save();

    res.status(201).json(newCar);
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Failed to upload car" });
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

module.exports = router;
