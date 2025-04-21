const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    make: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    year: { type: Number, required: true, min: 1886, max: new Date().getFullYear() },
    price: { type: Number, required: true, min: 0 },
    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    zipCode: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    fuelType: { type: String, required: true, enum: ["Petrol", "Diesel", "Electric", "CNG"] },
    transmission: { type: String, required: true, enum: ["Manual", "Automatic"] },
    segment: { 
      type: String, required: true, 
      enum: [
        "Hatchback", "Sedan", "SUV", "Crossover", "Convertible", "Coupe",
        "Pickup Truck", "Minivan", "Microcar", "Roadster", "Luxury Car", 
        "Sportscar", "MPV (Multi-Purpose Vehicle)", "Estate/Wagon", "Compact",
        "Subcompact", "Full-size", "Off-Road", "Van", "Electric", "Hybrid", "CNG"
      ],
    },
    seats: { type: Number, required: true, min: 1, max: 7 },
    color: { type: String, required: true },
    mileage: { type: Number, required: true, min: 0 },
    MainImage: { type: String, required: true },
    description: { type: String, trim: true },
    files: [{ type: String }],
    startDate: { type: String, required: true },
    startTime: { type: String, required: true },
    endDate: { type: String, required: true },
    endTime: { type: String, required: true },
    userStartDate: { type: String, },
    userStartTime: { type: String, },
    userEndDate: { type: String, },
    userEndTime: { type: String, },
    upcomingService: { type: String, required: true },
    lastService: { type: String, required: true },
    tiresCondition: { type: String, required: true, enum: ["Excellent", "Good", "Fair", "Poor"] },
    rcBook: { type: String, required: true },
    insuranceDocument: { type: String, required: true },
    pollutionCertificate: { type: String, required: true },
    UsageLimits: { type: Number, required: true },
    ExtraCharges: { type: Number, required: true },
    Acceleration: { type: Number, required: true },
    TopSpeed: { type: Number, required: true },
    PeakPower: { type: Number, required: true },
    features: {
      airbags: { type: Boolean, default: false },
      abs: { type: Boolean, default: false },
      parkingSensors: { type: Boolean, default: false },
      blindSpotMonitoring: { type: Boolean, default: false },
      Bluetooth: { type: Boolean, default: false },
      GPS: { type: Boolean, default: false },
      sunRoof: { type: Boolean, default: false },
      crouseControl: { type: Boolean, default: false },
    },
    host: { type: mongoose.Schema.Types.ObjectId, ref: "Host", required: true },
    available:{
      type:Boolean,
      default: true
    },
    availableSituation:{
      type:String,
      enum: ["active", "pending", "booked", "conpleted", "canceled", "diactive"] ,
      default: "active"
    }
  },
  { timestamps: true }
);

const Carmodel = mongoose.model("Car", carSchema);
module.exports = { Carmodel };