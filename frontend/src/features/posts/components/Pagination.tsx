"use client";
import React, { useState } from "react";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

const PostPagination = ({ pagination }: { pagination: any }) => {
	const { totalPages, currentPage } = pagination;

	return (
		<Pagination className="w-full">
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious href={`?page=${currentPage - 1}`} />
				</PaginationItem>
				{Array.from({ length: totalPages }, (_, i) => {
					return i + 1;
				}).map((page) => {
					return (
						<PaginationItem>
							<PaginationLink
								isActive={page === currentPage}
								href={`?page=${page}`}
							>
								{page}
							</PaginationLink>
						</PaginationItem>
					);
				})}
				<PaginationItem>
					<PaginationNext href={`?page=${currentPage + 1}`} />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export default PostPagination;
