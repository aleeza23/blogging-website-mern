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
					<PaginationPrevious
						aria-disabled={currentPage === 1}
						href={`?page=${currentPage - 1}`}
						className={
							currentPage === 1 ? "pointer-events-none opacity-50" : undefined
						}
					/>
				</PaginationItem>
				{Array.from({ length: totalPages }, (_, i) => {
					return i + 1;
				}).map((page) => {
					return (
						<PaginationItem key={page}>
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
					<PaginationNext
						aria-disabled={currentPage === totalPages}
						href={`?page=${currentPage + 1}`}
						className={
							currentPage === totalPages
								? "pointer-events-none opacity-50"
								: undefined
						}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export default PostPagination;
