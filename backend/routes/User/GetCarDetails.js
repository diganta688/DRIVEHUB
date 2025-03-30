const express = require("express");
const router = express.Router();
const { Carmodel } = require("../../models/Car");

router.get("/car/getAllCars", async (req, res) => {
  try {
    const cars = await Carmodel.find({});
    res.status(200).json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
