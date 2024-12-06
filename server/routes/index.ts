import express from "express";
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const articleRoute = require("./article.route");

const router = express.Router();

const routesIndex = [
  { path: "/auth", route: authRoute },
  { path: "/users", route: userRoute },
  { path: "/articles", route: articleRoute },
];

routesIndex.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
