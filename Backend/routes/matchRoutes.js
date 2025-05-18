const express = require("express");
const { matchNeed, getAllMatches } = require("../controllers/matchController");

const router = express.Router();

// Create match for a need
router.post("/:needId", matchNeed);

// Get all matches
router.get("/", getAllMatches);

module.exports = router;
