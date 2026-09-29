const AppError = require("../utils/error.utils");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const asyncWrap = require("../utils/asyncWrap.utils");

const protectRoute = asyncWrap(async (req, res, next) => {
	const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YWFlYzRkZWFjNTdiN2RiMDNiMTRmMGUiLCJmaXJzdE5hbWUiOiJBbGVlemEiLCJsYXN0TmFtZSI6IlJ1YmFiIiwiZW1haWwiOiJhenNoZ2ZAZ21haWwuY29tIiwiaWF0IjoxNzkwNjU5MzY4LCJleHAiOjE3OTEyNjQxNjh9.7ku6HUOjUIH4M8Zs9z2ISoOHG-tC_DTtvb-NKCBFuQk" || req.headers.cookie;

	// console.log(req.headers.cookie.split(";"), "tokens");
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
