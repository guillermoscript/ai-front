import { apiUrl } from "@/env";
import { routes } from "@/utils/routes";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import router from "next/router";
import { useCallback, useState } from "react";
import { useForm, FormProvider, set } from "react-hook-form";
import Input from "../ui/form/Input";
import PasswordComponent from "../ui/form/PasswordComponent";
import { useAuth } from "@/providers/Auth";
import * as yup from "yup";

const createAccountSchema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().min(6).required(),
});

type createAccountSchemaType = yup.InferType<typeof createAccountSchema>;

const classNames = {
	label: "text-xs font-medium text-neutral-600",
	input: "input input-bordered w-full",
	error: "pt-2 text-red-400",
	container: "mb-4",
};

type CreateAccountComponentProps = {
	searchParams: URLSearchParams;
	allParams: string;
};

export default function CreateAccountComponent({
	searchParams,
	allParams,
}: CreateAccountComponentProps) {
    
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const methods = useForm<createAccountSchemaType>({
		resolver: yupResolver(createAccountSchema),
		mode: "all",
	});
	const {
		handleSubmit,
		register,
		formState: { errors, isValid },
	} = methods;

	const { login } = useAuth();

	const onSubmit = useCallback(
		async (data: createAccountSchemaType) => {
			setLoading(true);

			const response = await fetch(`${apiUrl}/api/users`, {
				method: "POST",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				const message =
					response.statusText ||
					"There was an error creating the account.";
				setError(message);
				return;
			}

			const redirect = searchParams.get("redirect");

			const timer = setTimeout(() => {
				setLoading(true);
			}, 1000);

			try {
				await login(data);
				clearTimeout(timer);
				if (redirect) router.push(redirect as string);
				else
					router.push(
						`${
							routes.pages.dashboard.account.index
						}?success=${encodeURIComponent(
							"Account created successfully"
						)}`
					);
			} catch (_) {
				clearTimeout(timer);
				setError(
					"There was an error with the credentials provided. Please try again."
				);
			} finally {
				setLoading(false);
			}
		},
		[login, router, searchParams]
	);

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col space-y-4 gap-4"
			>
				<Input
					name="email"
					clasess={classNames}
					displayName="Email"
					type="email"
				/>
				<Input
					name="firstName"
					clasess={classNames}
					displayName="First Name"
					type="text"
				/>
				<Input
					name="lastName"
					clasess={classNames}
					displayName="Last Name"
					type="text"
				/>

				<PasswordComponent
					label="Password"
					name="password"
					register={register}
					errors={errors}
					isValid={isValid}
				/>

				<button
					type="submit"
					disabled={loading || !isValid}
					className="btn btn-primary w-full mt-4"
				>
					{loading ? "Processing" : "Create Account"}
				</button>

				{error && <div className="text-red-400">{error}</div>}

				<div className="flex justify-center">
					
					<Link
						className="text-sm font-medium text-primary btn-link"
						href={`/${routes.pages.login}${allParams}`}>
						Login
					</Link>
				</div>
			</form>
		</FormProvider>
	);
}
