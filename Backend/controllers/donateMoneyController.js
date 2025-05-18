const DonateMoney = require("../models/DonateMoney");

// Create a monetary donation entry
const createDonateMoney = async (req, res) => {
  try {
    const newDonation = new DonateMoney(req.body);
    await newDonation.save();
    res.status(201).json(newDonation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all monetary donations
const getAllDonateMoney = async (req, res) => {
  try {
    const donations = await DonateMoney.find();
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createDonateMoney, getAllDonateMoney };
