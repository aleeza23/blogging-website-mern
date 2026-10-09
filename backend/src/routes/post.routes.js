const express = require("express");
const asyncWrap = require("../utils/asyncWrap.utils");
const {
	createPostController,
	getPostController,
	deletePostController,
	updatePostController,
	getPostsController,
	getPopularPostsController,
	getUserPostsController,
	getStatsController,
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
router.get("/posts/my", protectRoute, asyncWrap(getUserPostsController));
router.get("/posts/popular", asyncWrap(getPopularPostsController));
router.get("/posts/stats", protectRoute, asyncWrap(getStatsController));
router.get("/posts/:slug", asyncWrap(getPostController));
router.delete("/posts/:slug", protectRoute, asyncWrap(deletePostController));
router.patch("/posts/:slug", protectRoute, asyncWrap(updatePostController));

module.exports = router;
