const Volunteer = require("../models/Volunteer");

// @desc    Register a new volunteer
// @route   POST /api/volunteer
const registerVolunteer = async (req, res) => {
  try {
    console.log("Incoming Volunteer Data:", req.body); // Debugging log

    // Step 1: Check if request body exists
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "No data received." });
    }

    // Step 2: Destructure and clean fields
    let {
      name,
      email,
      phone,
      location,
      expertise = "",
      availability,
      additionalInfo = ""
    } = req.body;

    name = name.trim();
    email = email.trim().toLowerCase();
    phone = phone.trim();
    location = location.trim();
    expertise = expertise?.trim();
    availability = availability.trim();
    additionalInfo = additionalInfo?.trim();

    // Step 3: Validate required fields
    if (!name || !email || !phone || !location || !availability) {
      return res.status(400).json({ error: "All required fields must be filled" });
    }

    // Step 4: Prevent duplicate registrations
    const existingVolunteer = await Volunteer.findOne({ email });
    if (existingVolunteer) {
      return res.status(400).json({ error: "This email is already registered." });
    }

    // Step 5: Save clean data
    const newVolunteer = new Volunteer({
      name,
      email,
      phone,
      location,
      expertise,
      availability,
      additionalInfo
    });

    await newVolunteer.save();

    res.status(201).json({ message: "Volunteer registered successfully" });
  } catch (error) {
    console.error("Error registering volunteer:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// @desc    Get all volunteers
// @route   GET /api/volunteer
const getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.status(200).json(volunteers);
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    res.status(500).json({ error: "Failed to fetch volunteers" });
  }
};

// @desc    Get a single volunteer by ID
// @route   GET /api/volunteer/:id
const getVolunteerById = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }
    res.status(200).json(volunteer);
  } catch (error) {
    console.error("Error fetching volunteer:", error);
    res.status(500).json({ error: "Failed to fetch volunteer" });
  }
};

// @desc    Delete a volunteer
// @route   DELETE /api/volunteer/:id
const deleteVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findByIdAndDelete(req.params.id);
    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }
    res.status(200).json({ message: "Volunteer deleted successfully" });
  } catch (error) {
    console.error("Error deleting volunteer:", error);
    res.status(500).json({ error: "Failed to delete volunteer" });
  }
};

module.exports = {
  registerVolunteer,
  getAllVolunteers,
  getVolunteerById,
  deleteVolunteer
};
