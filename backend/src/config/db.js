const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		if (!process.env.MONGODB_URI) throw new Error("Mongodb URI Missing");
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("DB connected");
	} catch (error) {
		console.log(`Failed to connect DB: ${error.message}`);
		process.exit(1);
	}
};

module.exports = connectDB;
