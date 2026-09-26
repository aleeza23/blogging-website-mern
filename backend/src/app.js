const express = require("express");
const app = express();
const healthRoute = require("./routes/health.routes");
const userRoute = require("./routes/user.routes");
const postRoute = require("./routes/post.routes");
const commentRoute = require("./routes/comment.routes");
const cors = require("cors");
const errorHandler = require("./middlewares/error.middleware");
var cookieParser = require("cookie-parser");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", userRoute);
app.use("/api", healthRoute);
app.use("/api", postRoute);
app.use("/api", commentRoute);

app.use(errorHandler);
module.exports = app;
