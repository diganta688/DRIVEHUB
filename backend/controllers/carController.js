const { Carmodel } = require("../models/Car");
const { Hostmodel } = require("../models/Host");
const { UserModel } = require("../models/User");
const NotificationModel = require("../models/Notifications");
const nodemailer = require("nodemailer");

module.exports = {
  async uploadCar(req, res) {
    try {
      const hostId = req.params.id;
      const host = await Hostmodel.findById(hostId);
      if (!host) return res.status(404).json({ error: "Host not found" });

      const mainImagePath = req.files["MainImage"] ? req.files["MainImage"][0].path : null;
      const additionalFiles = req.files["files"] ? req.files["files"].map((file) => file.path) : [];
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
  },

  async updateUserInfo(req, res) {
    const userId = req.params.id;
    const { name } = req.body;

    try {
      const updatedUser = await Hostmodel.findByIdAndUpdate(userId, { name }, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User info updated", user: updatedUser });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  async updateUserPhoto(req, res) {
    const userId = req.params.id;
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      const updatedUser = await Hostmodel.findByIdAndUpdate(userId, { profilePhoto: req.file.path }, { new: true });
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
  },

  async getCars(req, res) {
    try {
      const hostId = req.params.id;
      const host = await Hostmodel.findById(hostId).populate("cars");
      if (!host) {
        return res.status(401).json({ error: "Host not found" });
      }
      res.status(200).json({ cars: host.cars });
    } catch (error) {
      console.error("Error fetching cars:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  async updateCar(req, res) {
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
  },

  async sendNotification(req, res) {
    const notification = await NotificationModel.findById(req.params.id)
      .populate("userId")
      .populate("carId");
    res.json(notification);
  },

  async updateCarStatus(req, res) {
    const { id } = req.params;
    const { status, notificationId, hostId, userId, carId, totalAmmount } = req.body;
    let booking = "none";
    try {
      const car = await Carmodel.findById(id);
      if (!car) return res.status(404).json({ message: "Car not found" });

      const notification = await NotificationModel.findById(notificationId);
      const host = await Hostmodel.findById(hostId);
      const user = await UserModel.findById(userId);

      if (status === true) {
        car.available = true;
        car.availableSituation = "active";
      } else if (status === false) {
        car.available = false;
        car.availableSituation = "diactive";
      } else if (status === "booked") {
        const rentHistoryEntry = user.RentHistory.find(entry => entry.carId.toString() === carId);
        if (!rentHistoryEntry) {
          return res.status(404).json({ message: "Rent history entry not found" });
        }
        car.available = false;
        car.availableSituation = "booked";
        notification.bookingStatus = "booked";
        rentHistoryEntry.bookingStatus = "booked";
        host.Earnings = (host.Earnings + totalAmmount) - 500;
        booking = "booked";
        await notification.save();
        await host.save();
        await user.save();
      } else if (status === "canceled") {
        const rentHistoryEntry = user.RentHistory.find(entry => entry.carId.toString() === carId);
        if (!rentHistoryEntry) {
          return res.status(404).json({ message: "Rent history entry not found" });
        }
        car.available = true;
        car.availableSituation = "active";
        rentHistoryEntry.bookingStatus = "canceled";
        await NotificationModel.findByIdAndDelete(notificationId);
        await user.save();
      } else {
        return res.status(400).json({ message: "Invalid status" });
      }

      await car.save();
      res.status(200).json({
        message: status === true ? "Car activated" : status === false ? "Car deactivated" : `Car marked as ${status}`,
        car,
        book: booking,
      });
    } catch (error) {
      console.error("Update Error:", error);
      res.status(500).json({ message: "Updation failed" });
    }
  },

  async sendConfirmationEmail(req, res) {
    const { carId, userId } = req.params;
    const { totalAmmount } = req.query;

    const user = await UserModel.findById(userId);
    const car = await Carmodel.findById(carId);

    if (!user) return res.status(404).json({ message: "User not found" });
    if (!car) return res.status(404).json({ message: "Car not found" });

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: `"Drive HUB" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "🚗 Car Booking Confirmation - Drive HUB",
        html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h2>Booking Confirmed!</h2>
            <p>Hi <strong>${user.name}</strong>,</p>
            <p>Thank you for booking with <strong>Drive HUB</strong>. Here are your booking details:</p>
            <hr />
            <h3>Car Details:</h3>
            <ul>
              <li><strong>Car:</strong> ${car.make} ${car.model} (${car.year})</li>
              <li><strong>Fuel Type:</strong> ${car.fuelType}</li>
              <li><strong>Transmission:</strong> ${car.transmission}</li>
              <li><strong>Seats:</strong> ${car.seats}</li>
              <li><strong>Color:</strong> ${car.color}</li>
              <li><strong>Car Location:</strong> ${car.address}, ${car.city}, ${car.state}, ${car.country} - ${car.zipCode}</li>
            </ul>
            <h3>Rental Period:</h3>
            <ul>
              <li><strong>From:</strong> ${car.userStartDate} at ${car.userStartTime}</li>
              <li><strong>To:</strong> ${car.userEndDate} at ${car.userEndTime}</li>
            </ul>
            <h3>Price:</h3>
            <p><strong>₹${car.price}/day</strong></p>
            <p><strong>Total Price: ₹${totalAmmount}</strong></p>
            <hr />
            <p>If you have any questions, feel free to reach out to us.</p>
            <p>Thank you for choosing <strong>Drive HUB</strong>!</p>
            <br />
            <p>🚗 Happy Driving!</p>
          </div>
        `,
      };

      const info = await transporter.sendMail(mailOptions);
      res.status(200).json({ message: `Confirmation Mail sent to ${user.name} successfully` });
    } catch (error) {
      console.error("Error sending confirmation email:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
