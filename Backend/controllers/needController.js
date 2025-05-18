const Need = require("../models/Need");

// Create a need request entry
const createNeed = async (req, res) => {
  try {
    const {
      name,
      itemNeeded,
      quantity,
      reason,
      phoneNumber,
      coordinates,
      status, // ✅ added
    } = req.body;

    const newNeed = new Need({
      name,
      itemNeeded,
      quantity,
      reason,
      phoneNumber,
      coordinates,
      status, // ✅ optional
    });

    await newNeed.save();
    res.status(201).json(newNeed);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all need requests (optionally filter by status)
const getAllNeeds = async (req, res) => {
  try {
    const filter = req.query.status ? { status: req.query.status } : {};
    const needs = await Need.find(filter);
    res.status(200).json(needs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createNeed, getAllNeeds };
