const express = require("express");
const asyncWrap = require("../utils/asyncWrap.utils");
const {
	createPostController,
	getPostController,
	deletePostController,
	updatePostController,
	getPostsController,
} = require("../controllers/post.controller");
const protectRoute = require("../middlewares/auth.middleware");
const validateRequest = require("../middlewares/validate.middleware");
const postSchema = require("../validators/post.validator");
const router = express.Router();

router.post(
	"/post",
	protectRoute,
	validateRequest(postSchema),
	asyncWrap(createPostController),
);
router.get("/post", asyncWrap(getPostsController));
router.get("/post/:slug", asyncWrap(getPostController));
router.delete("/post/:id", protectRoute, asyncWrap(deletePostController));
router.put("/post/:id", protectRoute, asyncWrap(updatePostController));

module.exports = router;
