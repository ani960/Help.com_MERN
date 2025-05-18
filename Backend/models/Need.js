const mongoose = require("mongoose");

const NeedSchema = new mongoose.Schema({
  name: { type: String, required: true },
  itemNeeded: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  reason: { type: String, required: true },
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

module.exports = mongoose.model("Need", NeedSchema);
