const express = require("express");
const { createDrop, getAllDrops } = require("../controllers/dropController");

const router = express.Router();

// @route   POST /api/drop
// @desc    Create a new drop-off donation (can include coordinates + status)
// @access  Public
router.post("/", createDrop);

// @route   GET /api/drop
// @desc    Get all drop-off donations (optional query: ?status=pending/assigned/completed)
// @access  Public
router.get("/", getAllDrops);

module.exports = router;
