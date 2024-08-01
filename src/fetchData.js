const axios = require("axios");
const fs = require("fs");
const path = require("path");

const env = require("dotenv");
env.config();

const url = process.env.DUMMY_DATA_URL;

const fetchData = async () => {
  try {
    const data = await axios.get(url);
    const dataPath = path.join(__dirname, "../Data/dummyData.json");
    console.log(path);
    fs.writeFileSync(dataPath, JSON.stringify(data.data, null, 2));
    //   console.log(data);
  } catch (err) {
    console.log(err);
  }
};

fetchData();
