import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import CreateAccountComponent from "@/components/auth/CreateAccountComponent";
import AuthLayout from "@/components/auth/AuthLayout";

const CreateAccount: React.FC = () => {
	const router = useRouter();
	const searchParams = useMemo(
		() => new URLSearchParams(router.query as any),
		[router.query]
	);
	const allParams = searchParams.toString()
		? `?${searchParams.toString()}`
		: "";

	return (
		<AuthLayout
			Links={
				<Link
					href="/login"
					className={`absolute right-4 top-4 md:right-8 md:top-8 z-20 text-sm font-medium text-primary hover:text-primary-dark`}
				>
					Login
				</Link>
			}
		>
			<div className="lg:p-8">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div className="flex flex-col space-y-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight">
							Create an account
						</h1>
						<p className="text-sm text-muted-foreground">
							Enter your email below to create your account
						</p>
					</div>
					<CreateAccountComponent
						searchParams={searchParams}
						allParams={allParams}
					/>
					<p className="px-8 text-center text-sm text-muted-foreground">
						By clicking continue, you agree to our{" "}
						<Link
							href="/terms"
							className="underline underline-offset-4 hover:text-primary"
						>
							Terms of Service
						</Link>{" "}
						and{" "}
						<Link
							href="/privacy"
							className="underline underline-offset-4 hover:text-primary"
						>
							Privacy Policy
						</Link>
						.
					</p>
				</div>
			</div>
		</AuthLayout>
	);
};

export default CreateAccount;
