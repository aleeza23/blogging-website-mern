import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const AdminLayout = async ({children}: {children: React.ReactNode}) => {
	const user = await getUser();

	if (user?.email !== "azshgf@gmail.com") {
		redirect("/");
	}

	return <>{children}</>;
};

export default AdminLayout;
