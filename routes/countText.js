const express = require("express");
const router = express.Router();
const CountText = require("../models/countModel");

router.get("/", async (req, res) => {
  try {
    const aliens = await CountText.find();
    res.json(aliens);
  } catch (err) {
    res.send("Error " + err);
  }
});

module.exports = router;
