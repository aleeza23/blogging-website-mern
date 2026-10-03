const uploadToCloudinary = require("../utils/uploadToCloudinary.utils");
const AppError = require("../utils/error.utils");

const uploadImageController = async (req, res) => {
	if (!req.file) {
		throw new AppError(400, "No file uploaded");
	}

	const result = await uploadToCloudinary(req.file.buffer, "blog");
	res
		.status(200)
		.json({ success: true, data: { imageUrl: result.secure_url } });
};

module.exports = uploadImageController;
