const healthController = (req, res) => {
	res.send({ success: true, message: "Health check successful" });
};

module.exports = healthController;