"use client";

import React from "react";
import {
	LayoutDashboard,
	FileText,
	MessageSquare,
	Users,
	Settings,
	LogOut,
	MoreVertical,
	Edit,
} from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "./sidebar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { User } from "@/types";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/context/authContext";
import { logout } from "@/features/auth/services/auth.service";

const navItems = [
	{
		title: "Dashboard",
		href: "/user/dashboard",
		icon: LayoutDashboard,
	},
	{
		title: "Published Posts",
		href: "/user/posts",
		icon: FileText,
	},
	{
		title: "Draft Posts",
		href: "/user/draft",
		icon: Edit,
	},
	{
		title: "Comments",
		href: "/user/comments",
		icon: MessageSquare,
	},
	// {
	// 	title: "Users",
	// 	href: "/user/users",
	// 	icon: Users,
	// },
];

const AppSidebar = ({ user }: { user: User }) => {
	const pathname = usePathname();
	const router = useRouter();

	const handleLogout = async () => {
		try {
			await logout();
			toast.success("Logout successfully");
			router.replace("/");
			router.refresh();
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast.error(error.response?.data.message || "Failed to logout");
			} else {
				toast.error("Something went wrong");
			}
		}
	};

	return (
		<Sidebar collapsible="icon">
			{/* Header */}
			<SidebarHeader>
				<div className="flex h-12 items-center gap-2">
					<div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
						A
					</div>

					<div className="flex min-w-0 flex-col group-data-[collapsible=icon]:hidden">
						<span className="truncate text-sm font-semibold">Admin Panel</span>

						<span className="truncate text-xs text-muted-foreground">
							Management
						</span>
					</div>
				</div>
			</SidebarHeader>

			{/* Navigation */}
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Management</SidebarGroupLabel>

					<SidebarGroupContent>
						<SidebarMenu>
							{navItems.map((item) => {
								const Icon = item.icon;

								return (
									<SidebarMenuItem key={item.href}>
										<SidebarMenuButton
											render={<Link href={item.href} />}
											tooltip={item.title}
											isActive={
												pathname === item.href ||
												pathname.startsWith(`${item.href}/`)
											}
											className="data-active:bg-primary  data-active:hover:bg-primary data-active:hover:text-white data-active:text-white transition-colors"
										>
											<Icon />

											<span className="group-data-[collapsible=icon]:hidden">
												{item.title}
											</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			{/* Footer */}
			<SidebarFooter className="px-0">
				<div className="border-t pt-3">
					<div className="flex items-center gap-3 px-1">
						<Avatar className="size-9 shrink-0">
							<AvatarImage
								src={user.avatarUrl || "/avatar.avif"}
								alt={`${user.firstName} ${user.lastName}`}
							/>

							<AvatarFallback>
								{user.firstName?.[0]}
								{user.lastName?.[0]}
							</AvatarFallback>
						</Avatar>

						<div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
							<p className="truncate text-sm font-medium">
								{user.firstName} {user.lastName}
							</p>

							<p className="truncate text-xs text-muted-foreground">
								{user.email}
							</p>
						</div>

						<DropdownMenu>
							<DropdownMenuTrigger>
								<span
									className="flex size-8 group-data-[collapsible=icon]:hidden shrink-0 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
								>
									<MoreVertical className="size-4" />
									<span className="sr-only">Open user menu</span>
								</span>
							</DropdownMenuTrigger>

							<DropdownMenuContent align="end" side="right">
								<DropdownMenuItem variant="destructive" onClick={handleLogout}>
									<LogOut />
									Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</SidebarFooter>
		</Sidebar>
	);
};

export default AppSidebar;
