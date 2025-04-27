// routes/carRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinaryConfig");
const upload = multer({ storage });
const carController = require("../controllers/UserInfoController");

router.get("/car/getAllCars", carController.getAllCars);
router.get("/car/getCarDetails/:id", carController.getCarDetails);
router.get("/getUserInfo/:id", carController.getUserInfo);
router.post("/updateinfo/:id", carController.updateUserInfo);
router.post("/updatephoto/:id", upload.single("file"), carController.updateUserPhoto);
router.put("/update-location/:id", carController.updateLocation);
router.post("/bookcarforuser/:userId/:carId", carController.bookCarForUser);
router.get("/check-status/:id/:carId", carController.checkBookingStatus);
router.get("/cancel/booking-cancel/:id/:carId", carController.cancelBooking);

module.exports = router;
