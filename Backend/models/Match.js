const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  need: { type: mongoose.Schema.Types.ObjectId, ref: "Need", required: true },
  drop: { type: mongoose.Schema.Types.ObjectId, ref: "Drop", required: true },
  volunteer: { type: mongoose.Schema.Types.ObjectId, ref: "Volunteer", required: true },
  status: {
    type: String,
    enum: ["assigned", "in-progress", "completed"],
    default: "assigned"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Match", MatchSchema);
