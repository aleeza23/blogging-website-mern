const AppError = require("../utils/error.utils");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protectRoute = async (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization) {
		throw new AppError(401, "Unauthorized: No Token Provided");
	}

	const token = authorization.split(" ")[1];
	// decode token
	const decoded = jwt.verify(token, process.env.JWT_SECRET);

	const user = await User.findById(decoded.userId);
	req.user = user;

	next();
};

module.exports = protectRoute;
