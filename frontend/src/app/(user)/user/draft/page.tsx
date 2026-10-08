import { Button } from "@/components/ui/button";
import PostPagination from "@/features/posts/components/Pagination";
import PostCard from "@/features/posts/components/PostCard";
import { getPosts } from "@/features/posts/services/post.services";
import { getUserPosts } from "@/features/posts/services/post.services.server";
import { Post } from "@/features/posts/types";
import Link from "next/link";

const DraftPosts = async ({
	searchParams,
}: {
	searchParams: Promise<{ page?: string }>;
}) => {
	const params = await searchParams;
	const page = Number(params.page) || 1;
	const limit = 6;
	const status = "draft";
	const data = await getUserPosts(page, limit, status);

	const posts = data.data;

	return (
		<>
			<div className="flex flex-wrap justify-between gap-2.5">
				<h2 className="text-xl font-bold mb-6">Draft Posts</h2>
			</div>

			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
				{posts.map((post: Post) => {
					return <PostCard post={post} isAdmin key={post.slug} />;
				})}
			</div>

			{posts.length === 0 && (
				<p className="text-center my-12">No post in draft</p>
			)}

			{posts.length !== 0 && <PostPagination pagination={data?.pagination} />}
		</>
	);
};

export default DraftPosts;
