"use client";
import React, { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Trash } from "lucide-react";
import CommentModal from "../modal/CommentModal";

const CommentTable = () => {
	const [openModal, setOpenModal] = useState<boolean>(false);

	const handleOpenModal = () => {
		setOpenModal(true);
	};
	return (
		<>
			<Table>
				<TableHeader className="bg-muted/50 rounded-2xl">
					<TableRow>
						<TableHead>Comment</TableHead>
						<TableHead>Post Title</TableHead>
						<TableHead>Author</TableHead>
						<TableHead>Date posted</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					<TableRow>
						<TableCell className="truncate max-w-20">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
							nobis inventore animi enim delectus similique dicta ipsam,
							suscipit quas voluptates quia totam error est quis nesciunt,
							placeat officia temporibus ratione amet repudiandae distinctio
							numquam eum.
						</TableCell>
						<TableCell className="truncate max-w-20">title</TableCell>
						<TableCell>Aleeza</TableCell>
						<TableCell>12-09/2026</TableCell>
						<TableCell className="flex gap-2">
							<Button
								size={"icon-xs"}
								variant={"outline"}
								onClick={handleOpenModal}
							>
								<Eye />
							</Button>
							<Button size={"icon-xs"} variant={"destructive"}>
								<Trash />
							</Button>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
			<CommentModal open={openModal} onOpenChange={setOpenModal} />
		</>
	);
};

export default CommentTable;
