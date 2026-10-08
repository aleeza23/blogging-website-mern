import { Button, buttonVariants } from "@/components/ui/button";
import PostPagination from "@/features/posts/components/Pagination";
import PostCard from "@/features/posts/components/PostCard";
import { getPosts } from "@/features/posts/services/post.services";
import { getUserPosts } from "@/features/posts/services/post.services.server";
import { Post } from "@/features/posts/types";
import { cn } from "cn";
import Link from "next/link";

const PublishedPosts = async ({
	searchParams,
}: {
	searchParams: Promise<{ page?: string }>;
}) => {
	const params = await searchParams;
	const page = Number(params.page) || 1;
	const limit = 6;
	const status = "published";
	const data = await getUserPosts(page, limit, status);

	const posts = data.data;

	return (
		<>
			<div className="flex flex-wrap justify-between gap-2.5">
				<h2 className="text-xl font-bold mb-6">Posts</h2>
				<Link
					href="/user/posts/add"
					className={cn(buttonVariants({ variant: "default" }))}
				>
					Create new post
				</Link>
			</div>

			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
				{posts.map((post: Post) => {
					return <PostCard post={post} isAdmin key={post.slug} />;
				})}
			</div>

			{posts.length === 0 && (
				<p className="text-center my-12">Create your first post</p>
			)}

			{posts.length !== 0 && <PostPagination pagination={data?.pagination} />}
		</>
	);
};

export default PublishedPosts;
