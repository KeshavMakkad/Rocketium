const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../../Data/dummyData.json");

// Get all data
router.get("/data", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Error reading data" });
    }
    let jsonData = JSON.parse(data);

    if (req.query.filter) {
      const filter = req.query.filter.toLowerCase();
      jsonData = jsonData.filter(
        (item) =>
          item.name.toLowerCase().includes(filter) ||
          item.language.toLowerCase().includes(filter) ||
          item.bio.toLowerCase().includes(filter)
      );
    }

    if (req.query.sortBy) {
      const sortBy = req.query.sortBy;
      const order = req.query.order === "desc" ? -1 : 1;
      jsonData.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -1 * order;
        if (a[sortBy] > b[sortBy]) return 1 * order;
        return 0;
      });
    }

    res.json(jsonData);
  });
});

module.exports = router;
