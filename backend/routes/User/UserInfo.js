const express = require("express");
const router = express.Router();
const { Carmodel } = require("../../models/Car");
const { UserModel } = require("../../models/User");

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


router.get("/getUserInfo/:id", async(req, res)=>{
  try{
    const {id} = req.params;
    const user = await UserModel.findById(id);
    if(!user){
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({user: user}); 
  }catch(error){
    res.status(500).json({ message: error.message }); 
  }
});

module.exports = router;
