const multer = require("multer");
const AppError = require("../utils/error.utils");
const storage = multer.memoryStorage();

const upload = multer({
	storage,
	limits: { fileSize: 5 * 1024 * 1024 },
	fileFilter: (req, file, cb) => {
		if (file.mimetype.startsWith("image/")) {
			cb(null, true);
		} else {
			cb(new AppError(401, "Only Image File is Allowed"));
		}
	},
});

module.exports = upload;
