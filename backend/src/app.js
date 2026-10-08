const express = require("express");
const app = express();
const healthRoute = require("./routes/health.routes");
const userRoute = require("./routes/user.routes");
const postRoute = require("./routes/post.routes");
const commentRoute = require("./routes/comment.routes");
const imageRoutes = require("./routes/image.routes");

const cors = require("cors");
const errorHandler = require("./middlewares/error.middleware");
var cookieParser = require("cookie-parser");

// const origins = ["http://localhost:3000", "https://blognest-mern.vercel.app"];
app.use(
	cors({
		origin: "https://blognest-mern.vercel.app",

		// origin: (origin, callback) => {
		// 	if (!origin) return callback(null, true);
		// 	if (origins.includes(origin)) return callback(null, true);
		// 	return callback(new Error("Not allowed by cors"));
		// },

		credentials: true,
	}),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", userRoute);
app.use("/api", healthRoute);
app.use("/api", postRoute);
app.use("/api", commentRoute);
app.use("/api", imageRoutes);

app.use(errorHandler);
module.exports = app;
