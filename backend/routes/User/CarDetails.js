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

module.exports = router;
