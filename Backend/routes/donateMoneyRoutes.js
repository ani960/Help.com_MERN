const express = require("express");
const { createDonateMoney, getAllDonateMoney } = require("../controllers/donateMoneyController");

const router = express.Router();

router.post("/", createDonateMoney);
router.get("/", getAllDonateMoney);

module.exports = router;
