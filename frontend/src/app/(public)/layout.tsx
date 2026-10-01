import Navbar from "@/components/shared/Navbar";
import AuthProvider from "@/context/authContext";
import React from "react";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<main>
				<AuthProvider>
					<Navbar />
					{children}
				</AuthProvider>
			</main>
		</>
	);
};

export default PublicLayout;
