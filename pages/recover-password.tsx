import React, { useCallback, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { apiUrl } from "@/env";
import Input from "@/components/ui/form/Input";
import Layout from "@/components/ui/layout/Layout";

const recoverPassword = yup.object().shape({
	email: yup.string().email().required(),
});
type recoverPasswordType = yup.InferType<typeof recoverPassword>;
const classNames = {
	label: "text-xs font-medium text-neutral-600",
	input: "input input-bordered w-full",
	error: "pt-2 text-red-400",
	container: "mb-4",
};

const RecoverPassword: React.FC = () => {
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	const methods = useForm<recoverPasswordType>({
		resolver: yupResolver(recoverPassword),
		mode: "all",
	});
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting, isValid },
	} = methods;

	const onSubmit = useCallback(async (data: recoverPasswordType) => {
		const response = await fetch(`${apiUrl}/api/users/forgot-password`, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.ok) {
			setSuccess(true);
			setError("");
		} else {
			setError(
				"There was a problem while attempting to send you a password reset email. Please try again."
			);
		}
	}, []);

	return (
		<Layout>
			{!success && (
				<>
					<h1>Recover Password</h1>
					<div className=" flex flex-col justify-center items-center">
						<p>
							{`Please enter your email below. You will receive an email message with instructions on
              how to reset your password. To manage your all users, `}
							<Link
								href={`${process.env.NEXT_PUBLIC_CMS_URL}/admin/collections/users`}
							>
								login to the admin dashboard
							</Link>
							{"."}
						</p>
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

								<button
									type="submit"
									disabled={isSubmitting || !isValid}
									className="btn btn-primary w-full mt-4"
								>
									{isSubmitting ? "Processing" : "Login"}
								</button>

								{error && (
									<div className="text-red-400">{error}</div>
								)}
							</form>
						</FormProvider>
					</div>
				</>
			)}
			{success && (
				<>
					<h1>Request submitted</h1>
					<p>
						Check your email for a link that will allow you to
						securely reset your password.
					</p>
				</>
			)}
    </Layout>
	);
};

export default RecoverPassword;
