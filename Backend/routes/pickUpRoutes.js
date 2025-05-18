const express = require("express");
const { createPickUp, getAllPickUps } = require("../controllers/pickUpController");

const router = express.Router();

// @route   POST /api/pickup
// @desc    Create a new pickup request (can include coordinates + status)
// @access  Public
router.post("/", createPickUp);

// @route   GET /api/pickup
// @desc    Get all pickup requests (optional query: ?status=pending/assigned/completed)
// @access  Public
router.get("/", getAllPickUps);

module.exports = router;
