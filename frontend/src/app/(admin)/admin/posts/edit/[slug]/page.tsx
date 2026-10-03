import PostForm from "@/features/posts/components/PostForm";
import React from "react";

const EditPost = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;
	return (
		<>
			<h2 className="text-xl font-medium mb-6">Update post</h2>
			<PostForm mode="edit" slug={slug} />
		</>
	);
};

export default EditPost;
