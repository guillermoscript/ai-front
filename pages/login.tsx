import React, { useCallback, useMemo, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/ui/form/Input";
import { useAuth } from "@/providers/Auth";
import Layout from "@/components/ui/layout/Layout";
import { routes } from "@/utils/routes";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginComponent from "@/components/auth/LoginComponent";

const signinSchema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup
		.string()
		// .min(6)
		.required(),
});

type SigninSchemaType = yup.InferType<typeof signinSchema>;

const classNames = {
	label: "text-xs font-medium text-neutral-600",
	input: "input input-bordered w-full",
	error: "pt-2 text-red-400",
	container: "mb-4",
};

const Login: React.FC = () => {
	const router = useRouter();
	const searchParams = useMemo(
		() => new URLSearchParams(router.query as any),
		[router.query]
	);
	const allParams = searchParams.toString()
		? `?${searchParams.toString()}`
		: "";
	const redirect = useRef(searchParams.get("redirect"));
	const { login } = useAuth();
	const [error, setError] = React.useState<string | null>(null);

	const methods = useForm<SigninSchemaType>({
		resolver: yupResolver(signinSchema),
		mode: "all",
	});
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting, isValid },
	} = methods;

	const onSubmit = useCallback(
		async (data: SigninSchemaType) => {
			try {
				await login(data);
				// if (redirect?.current) router.push(redirect.current as string);
				router.push(routes.pages.dashboard.account.index);
			} catch (_) {
				setError(
					"There was an error with the credentials provided. Please try again."
				);
			}
		},
		[login, router]
	);

	return (
		<AuthLayout
			Links={
				<Link
					href="/create-account"
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
							Login to your account
						</h1>
						<p className="text-sm text-muted-foreground">
							Enter your email below to login to your account
						</p>
					</div>
					<LoginComponent
						searchParams={searchParams}
						allParams={allParams}
					/>
				</div>
			</div>

		</AuthLayout>
	);
};

export default Login;
