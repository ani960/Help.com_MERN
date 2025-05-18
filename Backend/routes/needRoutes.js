const express = require("express");
const { createNeed, getAllNeeds } = require("../controllers/needController");

const router = express.Router();

// @route   POST /api/need
// @desc    Create a new need request (can include coordinates + status)
// @access  Public
router.post("/", createNeed);

// @route   GET /api/need
// @desc    Get all need requests (optional query: ?status=pending/assigned/completed)
// @access  Public
router.get("/", getAllNeeds);

module.exports = router;
