const express = require("express");
const asyncWrap = require("../utils/asyncWrap.utils");
const {
	createCommentController,
	deleteComment,
	getComments,
} = require("../controllers/comment.controller");
const protectRoute = require("../middlewares/auth.middleware");
const validateRequest = require("../middlewares/validate.middleware");
const commentSchema = require("../validators/comment.validator");
const router = express.Router();

router.post(
	"/comment/:postId",
	protectRoute,
	validateRequest(commentSchema),
	asyncWrap(createCommentController),
);
router.delete("/comment/:commentId", protectRoute, asyncWrap(deleteComment));
router.get("/comment/:postId", asyncWrap(getComments));

module.exports = router;
