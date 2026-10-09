import Link from "next/link";
import { Post } from "../types";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

interface PopularPostsProps {
	posts: Post[];
}

const PopularPosts = ({ posts }: PopularPostsProps) => {
	return (
		<div>
			<h4 className="text-sm font-bold text-slate-900">Most Popular</h4>

			{posts.length === 0 ? (
				<p className="text-sm text-muted-foreground py-4">
					No popular posts yet.
				</p>
			) : (
				<ul>
					{posts.map((post) => (
						<li key={post.slug}>
							<Link
								href={`/post/${post.slug}`}
								className="flex items-center gap-4 py-4 group"
							>
								<Image
									src={post.coverImageUrl || "/images.jpg"}
									alt={post.title}
									width={96}
									height={48}
									className="w-24 h-12 shrink-0 rounded object-fill"
								/>

								<span className="text-sm leading-snug font-bold text-slate-900 group-hover:underline">
									{post.title}
								</span>
							</Link>

							<Separator />
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default PopularPosts;
