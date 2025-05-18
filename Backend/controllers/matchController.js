const Need = require("../models/Need");
const Drop = require("../models/Drop");
const Volunteer = require("../models/Volunteer");
const Match = require("../models/Match"); // ✅ New

const getDistance = (a, b) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371;

  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);

  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const aVal =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(aVal), Math.sqrt(1 - aVal));
  return R * c;
};

const matchNeed = async (req, res) => {
  try {
    const needId = req.params.needId.trim();
    const need = await Need.findById(needId);

    if (!need || need.status !== "pending") {
      return res.status(404).json({ error: "Need not found or already assigned" });
    }

    const allDrops = await Drop.find({ category: need.itemNeeded, status: "pending" });
    if (!allDrops.length) return res.status(404).json({ error: "No matching drops available" });

    const closestDrop = allDrops.reduce((closest, drop) => {
      const dist = getDistance(need.coordinates, drop.coordinates);
      const closestDist = getDistance(need.coordinates, closest.coordinates);
      return dist < closestDist ? drop : closest;
    });

    const allVolunteers = await Volunteer.find();
    if (!allVolunteers.length) return res.status(404).json({ error: "No volunteers available" });

    const closestVolunteer = allVolunteers.reduce((closest, vol) => {
      const vCoords = vol.coordinates || { lat: 0, lng: 0 };
      const dist = getDistance(closestDrop.coordinates, vCoords);
      const closestDist = getDistance(closestDrop.coordinates, closest.coordinates || { lat: 0, lng: 0 });
      return dist < closestDist ? vol : closest;
    });

    need.status = "assigned";
    closestDrop.status = "assigned";
    await need.save();
    await closestDrop.save();

    // ✅ Save to Match collection
    const newMatch = new Match({
      need: need._id,
      drop: closestDrop._id,
      volunteer: closestVolunteer._id
    });
    await newMatch.save();

    res.status(200).json({
      message: "Match created successfully",
      match: newMatch,
      need,
      drop: closestDrop,
      volunteer: closestVolunteer,
    });
  } catch (error) {
    console.error("Matching error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ GET all matches
const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find()
      .populate("need")
      .populate("drop")
      .populate("volunteer")
      .sort({ createdAt: -1 });

    res.status(200).json(matches);
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ error: "Failed to fetch match history" });
  }
};

module.exports = {
  matchNeed,
  getAllMatches
};
