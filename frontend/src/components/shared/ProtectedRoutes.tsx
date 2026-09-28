"use client";

import { useAuth } from "@/context/authContext";
import { redirect } from "next/navigation";
import React from "react";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
	const { user, loading } = useAuth();

	if (loading) return "loading.......";

	if (!user) {
		redirect("/login");
	}

	return <>{children}</>;
};

export default ProtectedRoutes;