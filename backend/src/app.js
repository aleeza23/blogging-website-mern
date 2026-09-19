const express = require("express");
const app = express();
const healthRoute = require("./routes/health.routes");
const userRoute = require("./routes/user.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRoute);
app.use("/api", healthRoute);

module.exports = app;
