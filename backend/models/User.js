const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Your username is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  phone: {
    type: String,
    required: [true, "Your phone number is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  dob: {
    type: Date,
    required: [true, "Your date of birth is required"],
  },
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
