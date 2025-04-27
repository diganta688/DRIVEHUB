const Razorpay = require("razorpay");
const OrderPayment = require("../models/OrderPayment");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.RAZOR_PAY_ID,
  key_secret: process.env.RAZOR_PAY_SECRET,
});

// Controller to handle order creation
exports.createOrder = async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body;
    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt,
      notes,
    });

    const newOrder = new OrderPayment({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: "created",
    });
    await newOrder.save();
    res.json(order);
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ error: "Error creating order" });
  }
};

// Controller to handle payment verification
exports.verifyPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const secret = process.env.RAZOR_PAY_SECRET;
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ status: "invalid signature" });
    }

    const order = await OrderPayment.findOneAndUpdate(
      { order_id: razorpay_order_id },
      { status: "paid", payment_id: razorpay_payment_id },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json({ status: "ok" });
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ error: "Error verifying payment" });
  }
};
