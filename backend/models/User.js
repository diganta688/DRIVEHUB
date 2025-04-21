const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

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
  Premium:{
    type: Boolean,
    default: false
  },
  RentHistory:[{ type: Schema.Types.ObjectId, ref: "Car" }],
  profilePhoto:{
    type: String,
    default:""
  }
});
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const UserModel = model("User", userSchema);
module.exports = { UserModel };
