const AppError = require("../utils/error.utils");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const asyncWrap = require("../utils/asyncWrap.utils");

const protectRoute = asyncWrap(async (req, res, next) => {
	const token = req.headers.cookie.split("; ")[1].split("=")[1] || req.headers.cookie;

	// console.log(req.headers.cookie.split("; ")[1].split("=")[1], "tokens");
	// console.log(req.cookies.token, "browser tokens");

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
