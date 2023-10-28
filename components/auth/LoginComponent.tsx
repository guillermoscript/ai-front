import { useAuth } from "@/providers/Auth";
import { routes } from "@/utils/routes";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import router from "next/router";
import React, { useCallback, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Input from "../ui/form/Input";
import * as yup from "yup";

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

type LoginComponentProps = {
	searchParams: URLSearchParams;
	allParams: string;
};

export default function LoginComponent({
	searchParams,
	allParams,
}: LoginComponentProps) {

	const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = useState(false);
	const { login } = useAuth();

	const methods = useForm<SigninSchemaType>({
		resolver: yupResolver(signinSchema),
		mode: "all",
	});

	const {
		handleSubmit,
		register,
		formState: { errors, isValid },
	} = methods;

	const onSubmit = useCallback(
		async (data: SigninSchemaType) => {
            setLoading(true);
			try {
				await login(data);
				// if (redirect?.current) router.push(redirect.current as string);
				router.push(routes.pages.dashboard.account.index);
			} catch (_) {
				setError(
					"There was an error with the credentials provided. Please try again."
				);
			} finally {
                setLoading(false);
            }
		},
		[login, router]
	);

	return (
		<FormProvider {...methods}>
			<form
				className="flex flex-col space-y-4 gap-4"
				onSubmit={handleSubmit(onSubmit)}
			>

				<Input
					name="email"
					clasess={classNames}
					displayName="Email"
					type="email"
				/>
				<Input
					name="password"
					clasess={classNames}
					displayName="Password"
					type="password"
				/>

				<button
					type="submit"
					disabled={loading || !isValid}
					className="btn btn-primary w-full mt-4"
				>
					{loading ? "Processing" : "Login"}
				</button>

				{error && <div className="text-red-400">{error}</div>}
				<div className="flex justify-center items-center flex-col gap-1">
					<Link
						className="text-sm font-medium text-primary btn-link"
						href={`/create-account${allParams}`}>
						Create an account
					</Link>
					<br />
					<Link 
						className="text-sm font-medium text-secondary btn-link"
						href={`/recover-password${allParams}`}>
						Recover your password
					</Link>
				</div>
			</form>
		</FormProvider>
	);
}
