const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

const mongoUri =
  process.env.MONGODB_URI || "mongodb://localhost:27017/express-mongo";
mongoose.connect(mongoUri);

app.use(bodyParser.json());
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
