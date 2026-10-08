// const setAuthCookie = (res, token) => {
// 	res.cookie("token", token, {
// 		httpOnly: true,
// 		secure: process.env.NODE_ENV === "production",
// 		sameSite: "none",
// 		secure: true
// 	});
// };

// module.exports = setAuthCookie;

const setAuthCookie = (res, token) => {
	res.cookie("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
		path: "/",
	});
};

module.exports = setAuthCookie;