const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
	{
		comment: {
			type: String,
			required: [true, "Comment is required"],
			trim: true,
			maxLength: 1000,
		},
		post: {
			type: Schema.Types.ObjectId,
			ref: "Post",
			required: [true, "Post is required"],
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Author is required"],
		},
	},
	{ timestamps: true },
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
