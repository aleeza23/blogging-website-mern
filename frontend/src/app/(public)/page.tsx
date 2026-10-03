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

export default async function Home() {
	const { data: posts } = await getPosts();

	return (
		<Container className="grid lg:grid-cols-3 gap-10 items-start pt-32">
			<div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4 lg:col-span-2">
				{posts.length === 0 ? (
					<p className="text-muted-foreground">No posts yet.</p>
				) : (
					posts.map((post: Post) => <PostCard key={post.slug} post={post} />)
				)}
			</div>

			{/* right side panel */}
			<aside className="space-y-6">
				<Field className="gap-2.5">
					<FieldLabel htmlFor="inline-start-input">Search</FieldLabel>
					<InputGroup className="bg-white">
						<InputGroupInput id="inline-start-input" placeholder="Search..." />
						<InputGroupAddon align="inline-start">
							<SearchIcon className="text-muted-foreground" />
						</InputGroupAddon>
					</InputGroup>
					<FieldDescription>Search any blog</FieldDescription>
				</Field>

				<PopularPosts />
			</aside>
		</Container>
	);
}
