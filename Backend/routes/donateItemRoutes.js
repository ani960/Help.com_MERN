const express = require("express");
const { createDonateItem, getAllDonateItems } = require("../controllers/donateItemController");

const router = express.Router();

router.post("/", createDonateItem);
router.get("/", getAllDonateItems);

module.exports = router;
