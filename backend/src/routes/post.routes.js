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
const upload = require("../middlewares/upload.middleware");
const router = express.Router();

router.post(
	"/posts",
	protectRoute,
	upload.single("image"),
	validateRequest(postSchema),
	asyncWrap(createPostController),
);
router.get("/posts", asyncWrap(getPostsController));
router.get("/posts/:slug", asyncWrap(getPostController));
router.delete("/posts/:id", protectRoute, asyncWrap(deletePostController));
router.patch("/posts/:id", protectRoute, asyncWrap(updatePostController));

module.exports = router;
