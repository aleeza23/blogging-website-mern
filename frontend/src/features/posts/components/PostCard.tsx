import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

const dummyPost = {
	title: "Does WordPress 7.1 Optimize Your Images?",
	content:
		"Short answer: not really and if you’ve read the release notes, you already know why. WordPress 7.1 shipped on August 19, 2026, and one of its headline features is client-side media processing: your browser now handles image compression and thumbnail generation before upload.",
	slug: "does-wordpress-7-1-optimize-your-images",
	coverImageUrl: "/blog-01.png",
	tags: ["world of wordpress", "image optimization"],
	author: {
		name: "Bianca Rus",
		avatar: "https://i.pravatar.cc/80?img=47",
	},
	status: "published",
	createdAt: "2026-09-22T09:00:00.000Z",
	updatedAt: "2026-09-22T09:00:00.000Z",
};

const formatDate = (iso: string) =>
	new Date(iso).toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});

const PostCard = ({ post = dummyPost }) => {
	const { title, content, coverImageUrl, tags, author, createdAt } = post;

	return (
		<Card className="ring-0 pt-0">
			<div className="w-full h-full overflow-hidden">
				{coverImageUrl && (
					<Image
						src={coverImageUrl}
						alt={title}
						width={1000}
						height={1000}
						className="h-full w-full object-contain"
					/>
				)}
			</div>

				<CardHeader>
					<CardTitle>{title}</CardTitle>
					<CardDescription className="">{content}</CardDescription>
				</CardHeader>

			<CardFooter className="flex items-center gap-3">
				<Avatar className="h-7 w-7">
					<AvatarImage src={author?.avatar} alt={author?.name} />
					<AvatarFallback className="text-[10px] font-semibold">
						{author.name}
					</AvatarFallback>
				</Avatar>

				<span className="text-[12px] font-semibold uppercase tracking-[0.02em] text-slate-900">
					{author?.name}
				</span>

				<span className="text-[16px] font-light text-slate-500">/</span>

				<span className="text-[12px] font-semibold uppercase tracking-[0.02em] text-slate-900">
					{formatDate(createdAt)}
				</span>
			</CardFooter>
		</Card>
	);
};

export default PostCard;
