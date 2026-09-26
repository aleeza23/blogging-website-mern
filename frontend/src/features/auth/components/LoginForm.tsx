"use client";

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
import Link from "next/link";
import React, { useState } from "react";
import { Login } from "../types";
import { login } from "../services/auth.service";
import { toast } from "sonner";
import axios from "axios";

const LoginForm = () => {
	const [loginData, setLoginData] = useState<Login>({
		email: "",
		password: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoginData((prev) => ({
			...prev,
			[e.target.id]: e.target.value,
		}));
	};

	const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await login(loginData);
			toast.success("Login successfully");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast.error(error?.response?.data?.message);
			}
		}
	};

	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle>Login to your account</CardTitle>
				<CardDescription>
					Enter your email below to login to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleLogin}>
					<div className="flex flex-col gap-6">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								required
								value={loginData.email}
								onChange={handleChange}
							/>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
								<Link
									href="#"
									className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
								>
									Forgot your password?
								</Link>
							</div>
							<Input
								id="password"
								type="password"
								required
								placeholder="********"
								value={loginData.password}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="flex flex-col">
						<Button type="submit" className="w-full mt-4">
							Login
						</Button>

						<p className="text-center text-sm mt-3 text-muted-foreground">
							Don't have an account?{" "}
							<Link
								href="/register"
								className="underline underline-offset-4 text-primary"
							>
								Sign up
							</Link>
						</p>
					</div>
				</form>
			</CardContent>
		</Card>
	);
};

export default LoginForm;
