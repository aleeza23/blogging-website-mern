const express = require("express");
const upload = require("../middlewares/upload.middleware");
const asyncWrap = require("../utils/asyncWrap.utils");
const uploadImageController = require("../controllers/image.controller");
const router = express.Router();

router.post(
	"/upload",
	upload.single("coverImage"),
	asyncWrap(uploadImageController),
);


module.exports = router;