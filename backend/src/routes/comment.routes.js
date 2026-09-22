const express = require("express");
const asyncWrap = require("../utils/asyncWrap.utils");
const {
	createCommentController,
} = require("../controllers/comment.controller");
const protectRoute = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/comment", protectRoute, asyncWrap(createCommentController));

module.exports = router;
