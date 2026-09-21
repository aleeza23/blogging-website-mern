const express = require("express");
const app = express();
const healthRoute = require("./routes/health.routes");
const userRoute = require("./routes/user.routes");
const postRoute = require("./routes/post.routes");

const errorHandler = require("./middlewares/error.middleware");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRoute);
app.use("/api", healthRoute);
app.use("/api", postRoute);

app.use(errorHandler);
module.exports = app;
