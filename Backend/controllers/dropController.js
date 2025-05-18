const Drop = require("../models/Drop");

// Create a drop-off donation entry
const createDrop = async (req, res) => {
  try {
    const {
      category,
      quantity,
      condition,
      location,
      phoneNumber,
      coordinates,
      status,
    } = req.body;

    if (!category || !quantity || !condition || !location || !phoneNumber) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const newDrop = new Drop({
      category,
      quantity,
      condition,
      location,
      phoneNumber,
      coordinates,
      status,
    });

    await newDrop.save();
    res.status(201).json(newDrop);
  } catch (error) {
    console.error("Drop creation error:", error.message);
    res.status(400).json({ error: error.message });
  }
};

// Get all drop-off donations (optionally filter by status)
const getAllDrops = async (req, res) => {
  try {
    const filter = req.query.status ? { status: req.query.status } : {};
    const drops = await Drop.find(filter);
    res.status(200).json(drops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createDrop, getAllDrops };
