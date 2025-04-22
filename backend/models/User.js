const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

// RentHistory Snapshot Schema
const RentHistorySchema = new Schema({
  carId: { type: Schema.Types.ObjectId, ref: "Car" },
  snapshot: {
    make: String,
    model: String,
    year: Number,
    price: Number,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    fuelType: String,
    transmission: String,
    segment: String,
    seats: Number,
    color: String,
    mileage: Number,
    MainImage: String,
    description: String,
    files: [String],
    startDate: String,
    startTime: String,
    endDate: String,
    endTime: String,
    upcomingService: String,
    lastService: String,
    tiresCondition: String,
    rcBook: String,
    insuranceDocument: String,
    pollutionCertificate: String,
    UsageLimits: Number,
    ExtraCharges: Number,
    Acceleration: Number,
    TopSpeed: Number,
    PeakPower: Number,
    features: {
      airbags: Boolean,
      abs: Boolean,
      parkingSensors: Boolean,
      blindSpotMonitoring: Boolean,
      Bluetooth: Boolean,
      GPS: Boolean,
      sunRoof: Boolean,
      crouseControl: Boolean
    }
  },
  userStartDate: String,
  userStartTime: String,
  userEndDate: String,
  userEndTime: String,
  bookingStatus: {
    type: String,
    enum: ["pending", "booked", "canceled", "completed"],
    default: "pending"
  }
});

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  phone: {
    type: String,
    required: [true, "Your phone number is required"],
  },
  email: {
    type: String,
    required: [true, "Your email address is required"],
  },
  dob: {
    type: Date,
    required: [true, "Your date of birth is required"],
  },
  address: {
    type: String,
    required: [true, "Your address is required"],
  },
  city: {
    type: String,
    required: [true, "Your city is required"],
  },
  state: {
    type: String,
    required: [true, "Your state is required"],
  },
  zipCode: {
    type: String,
    required: [true, "Your zip code is required"],
  },
  country: {
    type: String,
    required: [true, "Your country is required"],
  },
  lng: {
    type: Number,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  licenseImage: {
    type: String,
    required: [true, "License image is required"],
  },
  licenseExpiryDate: {
    type: String,
    required: [true, "License expiry date is required"],
  },
  Premium: {
    type: Boolean,
    default: false
  },
  RentHistory: [RentHistorySchema],
  profilePhoto: {
    type: String,
    default: ""
  }
});

// Password hashing
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const UserModel = model("User", userSchema);
module.exports = { UserModel };
