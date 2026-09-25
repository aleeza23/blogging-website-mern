const Post = require("../models/post.model");
const AppError = require("../utils/error.utils");
const slugify = require("slugify");

// create post
const createPostController = async (req, res) => {
	const { title, content, coverImageUrl, tags, status } = req.body;

	console.log(req.file, "req file");

	if (!title || !content) {
		throw new AppError(400, "Title or content is missing");
	}

	const slug = slugify(title);
	const post = await Post.create({
		title,
		slug,
		content,
		coverImageUrl,
		tags,
		author: req.user._id,
		status,
	});

	res.status(201).json({ success: true, data: post });
};

// get single post
const getPostController = async (req, res) => {
	const { slug } = req.params;

	const post = await Post.findOne({ slug }).populate(
		"author",
		"firstName lastName avatarUrl bio",
	);

	if (!post) {
		throw new AppError(404, "Post not found");
	}

	res.status(200).json({ success: true, data: post });
};

// delete post
const deletePostController = async (req, res) => {
	const { id } = req.params;
	// first check the user if same user the one who created the post
	// find post with id get author of that post match it with the user logged in that is in protected middleware

	const post = await Post.findById(id);
	if (post.author.toString() !== req.user.id) {
		throw new AppError(401, "Unauthorized: Cannot delete post");
	}

	await post.deleteOne();

	res.status(200).json({ success: true, message: "Post deleted successfully" });
};

// update post
const updatePostController = async (req, res) => {
	const { id } = req.params;

	const post = await Post.findById(id);
	if (!post) {
		throw new AppError(404, "Post not found");
	}

	if (post.author.toString() !== req.user.id) {
		throw new AppError(401, "Unauthorized: Cannot update post");
	}

	const { title, content, coverImageUrl, tags, status } = req.body;
	if (title !== undefined) post.title = title;
	if (content !== undefined) post.content = content;
	if (coverImageUrl !== undefined) post.coverImageUrl = coverImageUrl;
	if (tags !== undefined) post.tags = tags;
	if (status !== undefined) post.status = status;

	await post.save();

	res.status(200).json({ success: true, message: "Post updated successfully" });
};

// get all posts
const getPostsController = async (req, res) => {
	const { search, tag } = req.query;
	const page = Math.max(parseInt(req.query.page) || 1, 1);
	const limit = Math.min(parseInt(req.query.limit) || 10, 30);
	const skip = (page - 1) * limit;

	const filters = { status: "published" };
	if (tag) filters.tags = tag;
	if (search) filters.$text = { $search: search };

	const [posts, totalPosts] = await Promise.all([
		Post.find(filters)
			.skip(skip)
			.limit(limit)
			.populate("author", "firstName lastName avatarUrl")
			.sort({ createdAt: -1 }),

		Post.countDocuments(filters),
	]);

	res.status(200).json({
		success: true,
		data: posts,
		pagination: {
			total: totalPosts,
			currentPage: page,
			totalPages: Math.ceil(totalPosts / limit),
		},
	});
};

module.exports = {
	createPostController,
	getPostController,
	deletePostController,
	updatePostController,
	getPostsController,
};
