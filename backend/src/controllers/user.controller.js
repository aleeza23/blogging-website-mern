const AppError = require("../utils/error.utils");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
	// get data from body
	const { firstName, lastName, email, password } = req.body;

	// check in db if email exists
	const isUser = await User.findOne({ email });
	if (isUser) {
		throw new AppError(402, "Email already exists");
	}

	// if user not exist hash password and store in db
	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await User.create({
		firstName,
		lastName,
		email,
		password: hashedPassword,
	});

	// generate token
	const token = jwt.sign(
		{
			userId: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
		},
		process.env.JWT_SECRET,
		{ expiresIn: "7d" },
	);

	res.status(201).send({ success: true, data: user, token });
};

const loginController = (req, res) => {
	res.json({ success: true, text: "hey" });
};

module.exports = { registerController, loginController };
