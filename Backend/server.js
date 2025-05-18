const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const Stripe = require("stripe");
const path = require("path");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Stripe Setup
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// === MODELS ===
const User = require("./models/User");
const DonateItem = require("./models/DonateItem");
const DonateMoney = require("./models/DonateMoney");
const Need = require("./models/Need");
const PickUp = require("./models/PickUp");
const Drop = require("./models/Drop");
const Volunteer = require("./models/Volunteer");

// === ROUTES ===
app.use("/api/donate-item", require("./routes/donateItemRoutes"));
app.use("/api/donate-money", require("./routes/donateMoneyRoutes"));
app.use("/api/drop", require("./routes/dropRoutes"));
app.use("/api/need", require("./routes/needRoutes"));
app.use("/api/pickup", require("./routes/pickUpRoutes"));
app.use("/api/volunteer", require("./routes/volunteerRoutes"));
app.use("/api/match", require("./routes/matchRoutes"));

// === Admin Routes ===
app.post("/api/admin/login", async (req, res) => {
  const { email, password } = req.body;
  const admin = await User.findOne({ email, role: "admin" });

  if (!admin || admin.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: admin._id, role: "admin" }, "SECRET_KEY", { expiresIn: "1h" });
  res.json({ token });
});

app.get("/api/admin/stats", async (req, res) => {
  try {
    const users = await User.countDocuments();
    const donations = await DonateItem.countDocuments() + await DonateMoney.countDocuments() + await Drop.countDocuments();
    const requests = await Need.countDocuments() + await PickUp.countDocuments();
    const volunteers = await Volunteer.countDocuments();
    res.json({ users, donations, requests, volunteers });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats" });
  }
});

app.get("/api/admin/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

app.get("/api/admin/donations", async (req, res) => {
  try {
    const itemDonations = await DonateItem.find();
    const moneyDonations = await DonateMoney.find();
    const dropDonations = await Drop.find();
    const allDonations = [
      ...itemDonations.map(d => ({ ...d._doc, type: "Item" })),
      ...moneyDonations.map(d => ({ ...d._doc, type: "Money" })),
      ...dropDonations.map(d => ({ ...d._doc, type: "Drop" })),
    ];
    res.json(allDonations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donations" });
  }
});

app.get("/api/admin/requests", async (req, res) => {
  try {
    const needRequests = await Need.find();
    const pickUpRequests = await PickUp.find();
    const allRequests = [
      ...needRequests.map(req => ({ ...req._doc, type: "Need" })),
      ...pickUpRequests.map(req => ({ ...req._doc, type: "Pickup" })),
    ];
    res.json(allRequests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching requests" });
  }
});

app.get("/api/admin/volunteers", async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching volunteers" });
  }
});

// === Stripe Payment ===
app.post("/api/payment", async (req, res) => {
  const { amount, email } = req.body;
  try {
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Amount must be greater than 0" });
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      description: "Donation for Help.com",
      receipt_email: email,
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message });
  }
});

// === Serve React Frontend and Admin Panel ===
app.use("/", express.static(path.join(__dirname, "../Frontend/build")));
app.use("/admin", express.static(path.join(__dirname, "../Admin-Panel/build")));

app.get("/admin/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Admin-Panel/build/index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/build/index.html"));
});

// === Start Server ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
