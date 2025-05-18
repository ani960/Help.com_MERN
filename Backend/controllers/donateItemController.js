const DonateItem = require("../models/DonateItem");

// Create a donation item
const createDonateItem = async (req, res) => {
  try {
    const newItem = new DonateItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all donation items
const getAllDonateItems = async (req, res) => {
  try {
    const items = await DonateItem.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createDonateItem, getAllDonateItems };
