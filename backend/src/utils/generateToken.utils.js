const jwt = require("jsonwebtoken");

const generateToken = (user) => {
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

	return token;
};

module.exports = generateToken;
