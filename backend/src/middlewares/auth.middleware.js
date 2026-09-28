const AppError = require("../utils/error.utils");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const asyncWrap = require("../utils/asyncWrap.utils");

const protectRoute = asyncWrap(async (req, res, next) => {
	const token = req.headers.cookie || req.cookies.token;

	console.log(req.headers.cookie, "tokens");

	if (!token) {
		throw new AppError(401, "Unauthorized: No Token Provided");
	}

	// decode token
	const decoded = jwt.verify(token, process.env.JWT_SECRET);

	const user = await User.findById(decoded.userId);
	req.user = user;

	next();
});

module.exports = protectRoute;
