const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const { xss } = require("express-xss-sanitizer");
const mongoSanitize = require("express-mongo-sanitize");
const { handleError, convertToAPIError } = require("./middleware/apiError");
const { jwtStrategy } = require("./middleware/passport");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

const passport = require("passport");

const mongoUri =
  process.env.MONGODB_URI || "mongodb://localhost:27017/express-mongo";
mongoose.connect(mongoUri);

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api", routes);

// Sanitize
app.use(xss());
app.use(mongoSanitize());

// Passport
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// Error handling middleware
app.use(convertToAPIError);
app.use(
  (err: Error, req: Express.Request, res: Express.Response, next: any) => {
    handleError(err, res);
  }
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
