const AppError = require("../utils/error.utils");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken.utils");
const setAuthCookie = require("../utils/cookie.utils");

const registerController = async (req, res) => {
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
	const token = generateToken(user);
	setAuthCookie(res, token);

	res.status(201).send({ success: true, data: user, token });
};

const loginController = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email }).select("+password");

	if (!user) {
		throw new AppError(404, "Email or password is wrong");
	}

	// compare password
	const passwordMatched = await bcrypt.compare(password, user.password);
	if (!passwordMatched) {
		throw new AppError(400, "Password is wrong");
	}

	// generate token
	const token = generateToken(user);
	setAuthCookie(res, token);

	res.status(200).send({
		success: true,
		data: {
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
		},
		token,
	});
};

const authController = (req, res) => {
	res.status(200).send({ success: true, data: req.user });
};

module.exports = { registerController, loginController, authController };
