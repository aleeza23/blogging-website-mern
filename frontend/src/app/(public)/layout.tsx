import Navbar from "@/components/shared/Navbar";
import React from "react";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Navbar />
			<main>{children}</main>
		</>
	);
};

export default PublicLayout;
