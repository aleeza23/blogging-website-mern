import PostForm from "@/features/posts/components/PostForm";
import React from "react";

const page = () => {
	return (
		<>
			<div className="flex flex-wrap justify-between gap-2.5">
				<h2 className="text-xl font-bold mb-6">Create Post</h2>
			</div>

			<PostForm />
		</>
	);
};

export default page;
