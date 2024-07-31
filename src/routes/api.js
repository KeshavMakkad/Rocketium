const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../../Data/dummyData.json");

router.get("/data", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading data" });
    }
    let jsonData = JSON.parse(data);

    res.json(jsonData);
  });
});

module.exports = router;
