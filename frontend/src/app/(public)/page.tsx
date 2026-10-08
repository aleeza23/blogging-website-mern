import Container from "@/components/layout/Container";
import PostCard from "@/features/posts/components/PostCard";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import PopularPosts from "@/features/posts/components/PopularPosts";
import { getPosts } from "@/features/posts/services/post.services";
import { Post } from "@/features/posts/types";
import PostPagination from "@/features/posts/components/Pagination";
import SearchInput from "@/features/posts/components/SearchInput";

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ page: string; search: string }>;
}) {
	const params = await searchParams;
	const page = Number(params.page) || 1;
	const limit = 2;
	const search = params.search || "";

	const data = await getPosts(page, limit, search);

	return (
		<Container className="grid lg:grid-cols-3 gap-10 items-start pt-32">
			<div className="lg:col-span-2 space-y-8">
				<div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4 w-full">
					{data?.data.length === 0 ? (
						<p className="text-muted-foreground">No posts yet.</p>
					) : (
						data?.data.map((post: Post) => (
							<PostCard key={post.slug} post={post} />
						))
					)}
				</div>
				<PostPagination pagination={data?.pagination} />
			</div>

			{/* right side panel */}
			<aside className="space-y-6">
				<SearchInput />

				<PopularPosts />
			</aside>
		</Container>
	);
}
