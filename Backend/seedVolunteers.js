const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Volunteer = require("./models/Volunteer");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("DB Connection Failed:", err);
    process.exit(1);
  }
};

const seedVolunteers = async () => {
  await connectDB();

  // Optional: Clear old data
  await Volunteer.deleteMany();

  const volunteers = [];

  for (let i = 0; i < 1000; i++) {
    volunteers.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: "03" + faker.phone.number("#########"),
      location: faker.location.city(),
      expertise: faker.person.jobTitle(),
      availability: faker.date.future().toISOString().split("T")[0],
      additionalInfo: faker.lorem.sentence(),
    });
  }

  await Volunteer.insertMany(volunteers);
  console.log("🎉 1000 Volunteers inserted!");
  process.exit();
};

seedVolunteers();
