"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Container from "../layout/Container";

const navLinks = [
	{ label: "How it works", href: "#how-it-works" },
	{ label: "Pricing", href: "#pricing" },
];

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const closeMenu = () => setIsOpen(false);

	return (
		<>
			<header className="fixed inset-x-0 top-0 z-30 w-11/12 max-w-6xl mx-auto border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl">
				<div className="px-4">
					<div className="flex items-center justify-between">
						{/* Logo */}
						<Link
							href="/"
							className="flex shrink-0 items-center"
							onClick={closeMenu}
						>
							<Image
								className="h-7 w-auto"
								src="/logo.png"
								width={500}
								height={500}
								alt="Website logo"
							/>
							<span className="sr-only">Website Title</span>
						</Link>

						{/* Desktop Navigation */}
						<nav className="hidden items-center justify-center gap-5 md:flex">
							{navLinks.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100"
								>
									{link.label}
								</Link>
							))}
						</nav>

						{/* Desktop Actions */}
						<div className="hidden items-center justify-end gap-3 sm:flex">
							<Link
								href="/register"
								className="rounded-md border border-transparent bg-clip-padding px-6 py-1.5 text-sm font-medium whitespace-nowrap outline transition-all"
							>
								Sign up
							</Link>

							<Link
								href="/login"
								className="bg-primary text-primary-foreground hover:bg-primary/80 rounded-md border border-transparent bg-clip-padding px-6 py-1.5 text-sm font-medium whitespace-nowrap outline-none transition-all"
							>
								Login
							</Link>
						</div>

						{/* Mobile Menu Button */}
						<button
							type="button"
							aria-label={isOpen ? "Close menu" : "Open menu"}
							aria-expanded={isOpen}
							onClick={() => setIsOpen((prev) => !prev)}
							className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-gray-900 transition-colors hover:bg-gray-100 md:hidden"
						>
							<Menu className="h-5 w-5" />
						</button>
					</div>
				</div>
			</header>

			{/* Mobile Overlay */}
			<div
				className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 md:hidden ${
					isOpen
						? "pointer-events-auto opacity-100"
						: "pointer-events-none opacity-0"
				}`}
				onClick={closeMenu}
				aria-hidden="true"
			/>

			{/* Mobile Drawer */}
			<aside
				className={`fixed inset-y-0 left-0 z-50 w-[280px] max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				}`}
				aria-hidden={!isOpen}
			>
				<div className="flex h-full flex-col">
					{/* Drawer Header */}
					<div className="flex items-center justify-between border-b px-5 py-4">
						<Link href="/" className="flex items-center" onClick={closeMenu}>
							<Image
								className="h-7 w-auto"
								src="/logo.png"
								width={500}
								height={500}
								alt="Website logo"
							/>
							<span className="sr-only">Website Title</span>
						</Link>

						<button
							type="button"
							aria-label="Close menu"
							onClick={closeMenu}
							className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-900 transition-colors hover:bg-gray-100"
						>
							<X className="h-5 w-5" />
						</button>
					</div>

					{/* Navigation */}
					<nav className="flex flex-col gap-2 px-4 py-6">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								onClick={closeMenu}
								className="rounded-xl px-4 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100"
							>
								{link.label}
							</Link>
						))}
					</nav>

					{/* Mobile Actions */}
					<div className="mt-auto flex flex-col gap-3 border-t p-5">
						<Link
							href="/login"
							onClick={closeMenu}
							className="rounded-md border border-transparent bg-clip-padding px-6 py-2.5 text-center text-sm font-medium whitespace-nowrap outline transition-all"
						>
							Sign in
						</Link>

						<Link
							href="/login"
							onClick={closeMenu}
							className="bg-primary text-primary-foreground hover:bg-primary/80 rounded-md border border-transparent bg-clip-padding px-6 py-2.5 text-center text-sm font-medium whitespace-nowrap outline-none transition-all"
						>
							Login
						</Link>
					</div>
				</div>
			</aside>
		</>
	);
};

export default Navbar;
