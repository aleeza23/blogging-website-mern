const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			required: [true, "First name is required"],
			minLength: 2,
			maxLength: 30,
		},
		lastName: {
			type: String,
			required: [true, "Last name is required"],
			minLength: 2,
			maxLength: 30,
		},
		email: {
			type: String,
			unique: true,
			lowercase: true,
			trim: true,
			required: [true, "Email is required"],
			match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			select: false,
			minLength: 8,
		},
		bio: { type: String, default: "", trim: true, maxLength: 500 },
		avatarUrl: { type: String, default: "" },
	},
	{ timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
