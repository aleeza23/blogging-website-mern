
import { getStats } from "@/features/posts/services/post.services.server";
import {
	BookOpen,
	Globe,
	FileEdit,
	MessageCircle,
	ArrowUpRight,
} from "lucide-react";


const statCards = [
	{
		title: "Total Published Posts",
		key: "totalPublishedPosts",
		description: "Published across the blog",
		icon: Globe,
		iconStyle: "bg-blue-100 text-blue-600",
	},
	{
		title: "My Published Posts",
		key: "myPublishedPosts",
		description: "Your live articles",
		icon: BookOpen,
		iconStyle: "bg-emerald-100 text-emerald-600",
	},
	{
		title: "My Drafts",
		key: "myDraftPosts",
		description: "Posts waiting to be published",
		icon: FileEdit,
		iconStyle: "bg-amber-100 text-amber-600",
	},
	{
		title: "My Comments",
		key: "myComments",
		description: "Comments you've written",
		icon: MessageCircle,
		iconStyle: "bg-violet-100 text-violet-600",
	},
] as const;

export default async function AdminDashboard() {
	const response = await getStats();
	const stats = response.data;

	return (
		<div className="space-y-8">
			<div>

				<h1 className="mt-2 text-3xl font-bold tracking-tight">
					Dashboard
				</h1>

				<p className="mt-2 text-sm text-muted-foreground">
					Track your posts, drafts, and engagement at a glance.
				</p>
			</div>

			<div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
				{statCards.map((card) => {
					const Icon = card.icon;

					return (
						<div
							key={card.key}
							className="group rounded-2xl border bg-card p-5 shadow-sm transition-all! duration-500! hover:-translate-y-1 hover:shadow-lg"
						>
							<div className="flex items-start justify-between">
								<div
									className={`flex size-12 items-center justify-center rounded-xl ${card.iconStyle}`}
								>
									<Icon className="size-6" />
								</div>

							</div>

							<div className="mt-6">
								<p className="text-sm font-medium text-muted-foreground">
									{card.title}
								</p>

								<p className="mt-2 text-4xl font-bold tracking-tight tabular-nums">
									{stats[card.key]}
								</p>

								<p className="mt-2 text-xs text-muted-foreground">
									{card.description}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
