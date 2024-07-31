const express = require("express");
const axios = require("axios");

const url = "https://microsoftedge.github.io/Demos/json-dummy-data/256KB.json";

const fetchData = async () => {
  const data = await axios.get(url);
  console.log(data);
};

fetchData();
