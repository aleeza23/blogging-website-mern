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

export default function Home() {
	return (
		<Container className="grid lg:grid-cols-3 gap-10 items-start pt-32">
			<div className="grid lg:grid-cols-2 gap-4 lg:col-span-2">
				<PostCard />
				<PostCard />
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
