import Link from "next/link";
import { PopularPost } from "../types";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const popularPosts: PopularPost[] = [
	{
		slug: "compress-jpeg-images",
		title: "6 Best Ways to Compress JPEG Images Without Losing Quality",
		coverImageUrl: "/blog-01.png",
	},
	{
		slug: "compress-gif-images",
		title: "5 Best Ways to Compress GIF Images Without Losing Quality",
		coverImageUrl: "/blog-01.png",
	},
	{
		slug: "resize-images-android",
		title: "Resize Images On Android Devices",
		coverImageUrl: "/blog-01.png",
	},
	{
		slug: "compress-images-email",
		title: "How to Compress Images for Email: Easy Tricks for Tiny File Sizes",
		coverImageUrl: "/blog-01.png",
	},
	{
		slug: "website-banner-dimensions",
		title:
			"Best Website Banner Dimensions for High-Quality Design and Performance",
		coverImageUrl: "/blog-01.png",
	},
];

const PopularPosts = () => {
	return (
		<div>
			<h4 className="text-sm font-bold text-slate-900">Most Popular</h4>

			<ul>
				{popularPosts.map((post) => (
					<li key={post.slug}>
						<Link
							href={`/posts/${post.slug}`}
							className="flex items-center gap-4 py-4 group"
						>
							<Image
								src={post.coverImageUrl}
								alt=""
								width={1000}
								height={1000}
								className="w-24 h-12 shrink-0 rounded object-cover"
							/>
							<span className="text-sm  leading-snug font-bold text-slate-900 group-hover:underline">
								{post.title}
							</span>
						</Link>
						<Separator />
					</li>
				))}
			</ul>
		</div>
	);
};

export default PopularPosts;
