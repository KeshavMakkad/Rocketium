const axios = require("axios");
const fs = require("fs").promises;
const path = require("path");
require("dotenv").config();

const url = process.env.DUMMY_DATA_URL;
const dataPath = path.join(__dirname, "../Data/dummyData.json");

const fetchData = async () => {
  try {
    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }

    await fs.writeFile(dataPath, JSON.stringify(response.data, null, 2));
    console.log("Data successfully fetched and saved.");
  } catch (err) {
    if (err.response) {
      console.error(
        `HTTP error: ${err.response.status} ${err.response.statusText}`
      );
    } else if (err.code === "ENOENT") {
      console.error(`File system error: ${err.message}`);
    } else {
      console.error("Error fetching or saving data:", err.message);
    }
  }
};

fetchData();
