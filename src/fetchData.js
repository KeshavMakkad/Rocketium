const axios = require("axios");
const fs = require("fs");
const path = require("path");

const url = "https://microsoftedge.github.io/Demos/json-dummy-data/256KB.json";

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
