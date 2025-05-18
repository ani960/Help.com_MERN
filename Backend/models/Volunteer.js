const mongoose = require("mongoose");

const VolunteerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    expertise: { type: String },
    availability: { type: String, required: true },
    additionalInfo: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Volunteer", VolunteerSchema);
