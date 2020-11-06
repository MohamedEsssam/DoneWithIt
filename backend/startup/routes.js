const express = require("express");
const cookieParser = require("cookie-parser");
const publicRoutes = require("../routes/public");
const privateRoutes = require("../routes/private");

module.exports = function (app) {
  app.use(express.json({ limit: "50mb" }));
  app.use(cookieParser());
  app.use("/api", [publicRoutes, privateRoutes]);
};
