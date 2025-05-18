const mongoose = require("mongoose");

const DonateItemSchema = new mongoose.Schema({
  donorName: { type: String, required: true },
  email: { type: String, required: true },
  itemType: { type: String, enum: ["Clothes", "Food", "Medical Supplies", "Toys", "Other"], required: true },
  itemCondition: { type: String, enum: ["New", "Gently Used", "Worn"], required: true },
  quantity: { type: Number, required: true, min: 1 },
  location: { type: String, required: true },
  additionalInfo: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("DonateItem", DonateItemSchema);
