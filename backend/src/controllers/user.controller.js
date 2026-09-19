const registerController = (req, res) => {
	const body = req.body;
	console.log(body);
	res.send("success");
};

const loginController = (req, res) => {
	res.json({ success: true, text: "hey" });
};

module.exports = { registerController, loginController };
