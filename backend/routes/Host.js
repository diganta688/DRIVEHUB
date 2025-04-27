const express = require("express");
const router = express.Router();
const { storage } = require("../cloudinaryConfig");
const multer = require("multer");
const upload = multer({ storage });
const carController = require("../controllers/carController");

router.post("/cars/upload/:id", upload.fields([
    { name: "MainImage", maxCount: 1 },
    { name: "files", maxCount: 5 },
    { name: "insuranceDocument", maxCount: 1 },
    { name: "pollutionCertificate", maxCount: 1 },
    { name: "rcBook", maxCount: 1 },
  ]), carController.uploadCar);

router.post("/updateinfo/:id", carController.updateUserInfo);

router.post("/updatephoto/:id", upload.single("file"), carController.updateUserPhoto);

router.post("/cars/get/:id", carController.getCars);

router.post("/:carId/car-update", carController.updateCar);

router.post("/get-car-user/notification/:id", carController.sendNotification);

router.post("/cars/activeStatus/:id", carController.updateCarStatus);

router.get("/send-mail/confirmation/:carId/:userId", carController.sendConfirmationEmail);

module.exports = router;
