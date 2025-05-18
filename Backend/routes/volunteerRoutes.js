const express = require("express");
const {
  registerVolunteer,
  getAllVolunteers,
  getVolunteerById,
  deleteVolunteer,
} = require("../controllers/volunteerController");

const router = express.Router();

// Register a new volunteer
router.post("/", registerVolunteer);

// Get all volunteers
router.get("/", getAllVolunteers);

// Get a single volunteer by ID
router.get("/:id", getVolunteerById);

// Delete a volunteer
router.delete("/:id", deleteVolunteer);

module.exports = router;
