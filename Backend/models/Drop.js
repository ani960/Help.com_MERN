const mongoose = require("mongoose");

const DropSchema = new mongoose.Schema({
  category: { type: String, enum: ["Clothes", "Food", "Medical Supplies", "Other"], required: true },
  quantity: { type: Number, required: true, min: 1 },
  condition: { type: String, required: true },
  location: { type: String, required: true },
  phoneNumber: { type: String, required: true, match: /^03\d{9}$/ },
  coordinates: {
    lat: Number,
    lng: Number,
  },
  status: {
    type: String,
    enum: ["pending", "assigned", "completed"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Drop", DropSchema);
