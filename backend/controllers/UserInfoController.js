const { Carmodel } = require("../models/Car");
const { UserModel } = require("../models/User");
const { Hostmodel } = require("../models/Host");
const NotificationModel = require("../models/Notifications");

const getAllCars = async (req, res) => {
  try {
    const cars = await Carmodel.find({});
    res.status(200).json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCarDetails = async (req, res) => {
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
};

const getUserInfo = async (req, res) => {
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
};

const updateUserInfo = async (req, res) => {
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
};

const updateUserPhoto = async (req, res) => {
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
};

const updateLocation = async (req, res) => {
  const { id } = req.params;
  const { address, city, state, zipCode, country, lat, lng, name, email, phone, licenseExpiryDate } = req.body;

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
};

const bookCarForUser = async (req, res) => {
  const { userId, carId } = req.params;
  const carInfo = req.body;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const car = await Carmodel.findById(carId);
    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }
    car.available = false;
    car.availableSituation = "pending";
    car.userStartDate = carInfo.userStartDate;
    car.userStartTime = carInfo.userStartTime;
    car.userEndDate = carInfo.userEndDate;
    car.userEndTime = carInfo.userEndTime;

    const snapshot = {
      make: car.make,
      model: car.model,
      year: car.year,
      price: car.price,
      address: car.address,
      city: car.city,
      state: car.state,
      zipCode: car.zipCode,
      country: car.country,
      fuelType: car.fuelType,
      transmission: car.transmission,
      segment: car.segment,
      seats: car.seats,
      color: car.color,
      mileage: car.mileage,
      MainImage: car.MainImage,
      description: car.description,
      files: car.files,
      startDate: car.startDate,
      startTime: car.startTime,
      endDate: car.endDate,
      endTime: car.endTime,
      upcomingService: car.upcomingService,
      lastService: car.lastService,
      tiresCondition: car.tiresCondition,
      rcBook: car.rcBook,
      insuranceDocument: car.insuranceDocument,
      pollutionCertificate: car.pollutionCertificate,
      UsageLimits: car.UsageLimits,
      ExtraCharges: car.ExtraCharges,
      Acceleration: car.Acceleration,
      TopSpeed: car.TopSpeed,
      PeakPower: car.PeakPower,
      features: car.features,
    };

    user.RentHistory.push({
      carId: car._id,
      snapshot,
      userStartDate: carInfo.userStartDate,
      userStartTime: carInfo.userStartTime,
      userEndDate: carInfo.userEndDate,
      userEndTime: carInfo.userEndTime,
      bookingStatus: "pending",
    });
    await user.save();
    await car.save();
    const Host = await Hostmodel.findById(car.host);
    const notificationModel = await NotificationModel.create({
      userId: user._id,
      carId: car._id,
      bookingStatus: "pending",
      userStartDate: carInfo.userStartDate,
      userEndDate: carInfo.userEndDate,
      userStartTime: carInfo.userStartTime,
      userEndTime: carInfo.userEndTime,
      message: "Booking",
    });
    Host.notifications.push(notificationModel);
    await Host.save();
    return res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      user,
      car,
    });
  } catch (error) {
    console.error("Error while booking car for user:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const checkBookingStatus = async (req, res) => {
  const user = await UserModel.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  const rentHistoryEntry = user.RentHistory.find(
    (entry) => entry.carId.toString() === req.params.carId
  );
  if (!rentHistoryEntry) {
    return res.status(404).json({
      success: false,
      message: "No rental history found for this car",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Rental status retrieved successfully",
    rentStatus: rentHistoryEntry.bookingStatus,
  });
};

const cancelBooking = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    const car = await Carmodel.findById(req.params.carId);
    await NotificationModel.deleteOne({ carId: req.params.carId });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }
    const rentHistoryEntry = user.RentHistory.find(
      (entry) => entry.carId.toString() === req.params.carId
    );
    if (!rentHistoryEntry) {
      return res.status(404).json({
        success: false,
        message: "No rental history found for this car",
      });
    }
    rentHistoryEntry.bookingStatus = "canceled";
    car.available = true;
    car.availableSituation = "active";
    await user.save();
    await car.save();
    return res.status(200).json({
      success: true,
      message: "Booking canceled successfully",
      user,
      car,
    });
  } catch (error) {
    console.error("Cancel Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  getAllCars,
  getCarDetails,
  getUserInfo,
  updateUserInfo,
  updateUserPhoto,
  updateLocation,
  bookCarForUser,
  checkBookingStatus,
  cancelBooking,
};