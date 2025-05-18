const express = require("express");
const Drop = require("../models/Drop");
const Need = require("../models/Need");
const PickUp = require("../models/PickUp");

const router = express.Router();

// Combined route for all requests
router.get("/requests", async (req, res) => {
  try {
    const [drops, needs, pickups] = await Promise.all([
      Drop.find(),
      Need.find(),
      PickUp.find()
    ]);

    const allRequests = [
      ...drops.map(r => ({ ...r._doc, type: "Drop" })),
      ...needs.map(r => ({ ...r._doc, type: "Need" })),
      ...pickups.map(r => ({ ...r._doc, type: "Pickup" })),
    ];

    res.status(200).json(allRequests);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch requests" });
  }
});

module.exports = router;
