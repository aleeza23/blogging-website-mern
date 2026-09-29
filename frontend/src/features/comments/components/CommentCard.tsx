import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "cn";
import React from "react";

const CommentCard = ({ className }: { className?: string }) => {
	return (
		<Card className={cn(className)}>
			<CardContent>
				<p>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate,
					ipsum? Odio et quibusdam iste ut maxime ducimus aspernatur
					perspiciatis ipsam cumque repellat! Incidunt sit assumenda in. Ab
					fugiat culpa quasi impedit reiciendis quis mollitia neque.
				</p>
			</CardContent>

			<CardFooter className="flex items-center gap-3">
				<Avatar className="h-7 w-7">
					<AvatarImage src={"/avatar.avif"} alt={"author"} />
					<AvatarFallback className="text-[10px] font-semibold">
						AZ
					</AvatarFallback>
				</Avatar>

				<span className="text-[12px] font-semibold uppercase tracking-[0.02em] text-slate-900">
					Author
				</span>
			</CardFooter>
		</Card>
	);
};

export default CommentCard;
