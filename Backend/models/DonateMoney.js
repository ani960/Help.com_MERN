const mongoose = require("mongoose");

const DonateMoneySchema = new mongoose.Schema({
  donorName: { type: String, required: true },
  email: { type: String, required: true },
  donationAmount: { type: Number, required: true, min: 1 },
  paymentMethod: { type: String, enum: ["Credit Card", "JazzCash", "Bank Transfer", "Other"], required: true },
  additionalInfo: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("DonateMoney", DonateMoneySchema);
