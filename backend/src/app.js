const express = require("express");
const app = express();
const healthRoute = require("./routes/health.routes");

app.use("/api", healthRoute);

module.exports = app;
