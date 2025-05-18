const PickUp = require("../models/PickUp");

// Create a pickup request entry
const createPickUp = async (req, res) => {
  try {
    const {
      address,
      time,
      itemCount,
      phoneNumber,
      coordinates,
      status, // ✅ added
    } = req.body;

    const newPickUp = new PickUp({
      address,
      time,
      itemCount,
      phoneNumber,
      coordinates,
      status, // ✅ optional
    });

    await newPickUp.save();
    res.status(201).json(newPickUp);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all pickup requests (optionally filter by status)
const getAllPickUps = async (req, res) => {
  try {
    const filter = req.query.status ? { status: req.query.status } : {};
    const pickups = await PickUp.find(filter);
    res.status(200).json(pickups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPickUp, getAllPickUps };
