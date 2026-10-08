require("dotenv").config();

const connectDB = require("./config/db");
const app = require("./app");

let isConnected = false;

const handler = async (req, res) => {
	if (!isConnected) {
		await connectDB();
		isConnected = true;
	}

	return app(req, res);
};

module.exports = handler;