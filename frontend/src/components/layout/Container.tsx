import { cn } from "cn";
import React from "react";

const Container = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<div className={cn("max-w-6xl mx-auto w-11/12 relative", className)}>
			{children}
		</div>
	);
};

export default Container;
