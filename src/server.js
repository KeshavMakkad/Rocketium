const express = require("express");
const apiRoutes = require("./routes/api");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
