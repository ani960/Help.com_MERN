const mongoose = require("mongoose");

const PickUpSchema = new mongoose.Schema({
  address: { type: String, required: true },
  time: { type: String, required: true },
  itemCount: { type: Number, required: true, min: 1 },
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

module.exports = mongoose.model("PickUp", PickUpSchema);
