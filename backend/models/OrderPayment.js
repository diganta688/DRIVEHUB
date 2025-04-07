const mongoose = require("mongoose");

const orderPaymentSchema = new mongoose.Schema({
  order_id: { type: String, required: true, unique: true },
  payment_id: { type: String, default: "" },
  amount: Number,
  currency: String,
  receipt: String,
  status: { type: String, enum: ["created", "paid"], default: "created" },
});

module.exports = mongoose.model("OrderPayment", orderPaymentSchema);
