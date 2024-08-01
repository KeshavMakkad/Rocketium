const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../../Data/dummyData.json");

const readJsonFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    throw new Error("Error reading or parsing data file");
  }
};

const filterData = (data, filter) => {
  if (!filter) return data;
  const lowercasedFilter = filter.toLowerCase();
  return data.filter(
    (item) =>
      item.name.toLowerCase().includes(lowercasedFilter) ||
      item.language.toLowerCase().includes(lowercasedFilter) ||
      item.bio.toLowerCase().includes(lowercasedFilter)
  );
};

const sortData = (data, sortBy, order) => {
  if (!["asc", "desc"].includes(order)) {
    throw new Error('Invalid sort order. Use "asc" or "desc".');
  }
  if (!data.every((item) => item.hasOwnProperty(sortBy))) {
    throw new Error(`Invalid sortBy field: ${sortBy}.`);
  }
  return data.sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return -1 * order;
    if (a[sortBy] > b[sortBy]) return 1 * order;
    return 0;
  });
};

router.get("/data", async (req, res) => {
  try {
    let jsonData = await readJsonFile(filePath);

    if (req.query.filter) {
      jsonData = filterData(jsonData, req.query.filter);
    }

    if (req.query.sortBy) {
      const sortBy = req.query.sortBy;
      const order = req.query.order === "desc" ? -1 : 1;

      jsonData = sortData(jsonData, sortBy, order);
    }

    res.json(jsonData);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
