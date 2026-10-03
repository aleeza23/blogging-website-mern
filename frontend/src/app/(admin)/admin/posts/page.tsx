import { Button } from "@/components/ui/button";
import PostCard from "@/features/posts/components/PostCard";
import { getPosts } from "@/features/posts/services/post.services";
import { Post } from "@/features/posts/types";
import Link from "next/link";
import React from "react";

const AddPost = async () => {
	const data = await getPosts();
	const posts = data.data;
	console.log(posts);

	return (
		<>
			<div className="flex flex-wrap justify-between gap-2.5">
				<h2 className="text-xl font-medium mb-6">Posts</h2>
				<Button render={<Link href="/admin/posts/add" />}>
					Create new post
				</Button>
			</div>

			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
				{posts.map((post: Post) => {
					return <PostCard post={post} isAdmin key={post.slug} />;
				})}
			</div>
		</>
	);
};

export default AddPost;
