const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
      min: 1886,
      max: new Date().getFullYear(),
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    zipCode: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    fuelType: {
      type: String,
      required: true,
      enum: ["Petrol", "Diesel", "Electric", "CNG"],
    },
    transmission: {
      type: String,
      required: true,
      enum: ["Manual", "Automatic"],
    },
    segment: { 
      type: String,
      required: true,
      enum: [
        "Hatchback",
        "Sedan",
        "SUV",
        "Crossover",
        "Convertible",
        "Coupe",
        "Pickup Truck",
        "Minivan",
        "Microcar",
        "Roadster",
        "Luxury Car",
        "Sportscar",
        "MPV (Multi-Purpose Vehicle)",
        "Estate/Wagon",
        "Compact",
        "Subcompact",
        "Full-size",
        "Off-Road",
        "Van",
        "Electric",
        "Hybrid",
        "CNG",
      ],
    },
    seats: {
      type: Number,
      required: true,
      min: 1,
      max: 7,
    },
    mileage: {
      type: Number,
      required: true,
      min: 0,
    },
    MainImage: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    files: [
      {
        type: String,
      },
    ],
    startDate: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    rcBook: {
      type: String,
      required: true,
    },
    insuranceDocument: {
      type: String,
      required: true,
    },
    pollutionCertificate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Carmodel = mongoose.model("Car", carSchema);
module.exports = { Carmodel };
