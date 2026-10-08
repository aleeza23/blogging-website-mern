import AdminNavbar from "@/components/layout/userNavbar";
import Container from "@/components/layout/Container";
import AppSidebar from "@/components/ui/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { getUser } from "@/features/auth/services/auth.services.server";
import { redirect } from "next/navigation";
import React from "react";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
	const user = await getUser();

	const SIDEBAR_WIDTH = "15rem";
	const SIDEBAR_WIDTH_ICON = "2rem";

	if (!user) {
		redirect("/");
	}

	return (
		<>
			<SidebarProvider
				style={{ "--sidebar-width": SIDEBAR_WIDTH } as React.CSSProperties}
			>
				<AppSidebar user={user} />
				<SidebarInset>
					<AdminNavbar user={user} />
					<Separator />

					<div className="py-6 h-full"><Container className="h-full"> {children} </Container></div>
				</SidebarInset>
			</SidebarProvider>
		</>
	);
};

export default AdminLayout;
