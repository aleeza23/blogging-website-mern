"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Signup } from "../types";
import { signup } from "../services/auth.service";
import { toast } from "sonner";
import axios from "axios";

const RegisterForm = () => {
	const [signupData, setSignupData] = useState<Signup>({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSignupData((prev) => ({
			...prev,
			[e.target.id]: e.target.value,
		}));
	};

	const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await signup(signupData);
			toast.success("User registered successfully");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast.error(error?.response?.data?.message || "Something went wrong!");
			}
		}
	};

	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle>Create an account</CardTitle>
				<CardDescription>
					Enter your information below to create your account
				</CardDescription>
			</CardHeader>

			<CardContent>
				<form onSubmit={handleSignup}>
					<div className="flex flex-col gap-6">
						<div className="grid gap-2">
							<Label htmlFor="firstName">First Name</Label>
							<Input
								id="firstName"
								type="text"
								placeholder="John"
								required
								value={signupData.firstName}
								onChange={handleChange}
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="lastName">Last Name</Label>
							<Input
								id="lastName"
								type="text"
								placeholder="Doe"
								required
								value={signupData.lastName}
								onChange={handleChange}
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								required
								value={signupData.email}
								onChange={handleChange}
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								required
								placeholder="********"
								value={signupData.password}
								onChange={handleChange}
							/>
						</div>

						<div className="flex flex-col">
							<Button type="submit" className="w-full">
								Create Account
							</Button>

							<p className="text-center text-sm mt-3 text-muted-foreground">
								Already have an account?{" "}
								<Link
									href="/login"
									className="underline underline-offset-4 text-primary"
								>
									Sign in
								</Link>
							</p>
						</div>
					</div>
				</form>
			</CardContent>
		</Card>
	);
};

export default RegisterForm;
