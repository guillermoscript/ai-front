import AccountLayout from "@/components/ui/layout/AccountLayout";
import { apiUrl } from "@/env";
import { PaymentMethod } from "@/payload-types";
import getPayloadCookie from "@/utils/getPayloadCookie";
import { PaginatedDocs } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import * as yup from "yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormAddPaymentMethod from "@/components/account/paymentMethod/FormAddPaymentMethod";

type PaymentMethodPageProps = {
	paymentMethod: PaginatedDocs<PaymentMethod>;
};

export default function PaymentMethodPage({
	paymentMethod,
}: PaymentMethodPageProps) {
	// const [paymentMethodSelected, setPaymentMethodSelected] = useState()
	const [openAddPaymentMethod, setOpenAddPaymentMethod] = useState(false);

	return (
		<AccountLayout>
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<div className="flex gap-3 flex-col">
						<h3 className="text-lg font-medium">Account</h3>
						<p className="text-sm text-muted-foreground">
							Update your selected payment method.
						</p>
					</div>
					<div className="flex gap-3 items-center">
						<button className="text-sm font-medium text-primary">
							Edit
						</button>
						<button
							onClick={() => setOpenAddPaymentMethod(true)}
							className="text-sm font-medium text-primary"
						>
							Add
						</button>
					</div>
				</div>
				{paymentMethod.totalDocs > 0 ? (
					paymentMethod.docs.map((paymentMethod) => {
						const type = paymentMethod.paymentMethodType;
						const paymentMethodSelected =
							paymentMethod[type as keyof typeof paymentMethod];

						return (
							<div
								key={paymentMethod.id}
								className="flex items-center justify-between"
							>
								<div className="flex items-center">
									{/* <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary">
											<Image
												src={paymentMethod.image}
												alt={paymentMethod.name}
												width={24}
												height={24}
											/>
										</div> */}
									{paymentMethod.default && (
										<svg
											width="15"
											height="15"
											viewBox="0 0 15 15"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
												fill="currentColor"
												fillRule="evenodd"
												clipRule="evenodd"
											></path>
										</svg>
									)}
									<div className="ml-4">
										<p className="text-sm font-medium">
											{paymentMethod.title}
										</p>

										{type === "stripe" ? (
											<p className="text-sm text-muted-foreground">
												Pagos con tarjeta de crédito y
												débito
											</p>
										) : (
											<p className="text-sm text-muted-foreground">
												{Object.keys(
													paymentMethodSelected as any
												).map((key) => (
													<span key={key}>
														{key}:{" "}
														{
															// @ts-ignore
															paymentMethodSelected[
																key as keyof typeof paymentMethodSelected
															]
														}
														<br />
													</span>
												))}
											</p>
										)}
									</div>
								</div>
							</div>
						);
					})
				) : (
					<div className="flex items-center justify-center w-full h-24 bg-gray-100 rounded-md">
						<p className="text-sm font-medium text-muted-foreground">
							No payment method added.
						</p>
					</div>
				)}
			</div>

			{openAddPaymentMethod && <FormAddPaymentMethod />}
		</AccountLayout>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const token = getPayloadCookie(context);

	const headers = {
		Authorization: `JWT ${token}`,
	};
	try {
		const { data: user } = await axios.get(`${apiUrl}/api/users/me`, {
			headers,
		});
		console.log(user, "user");

		const paymentMethod = await axios.get<PaginatedDocs<PaymentMethod>>(
			`${apiUrl}/api/payment-methods`,
			{
				headers,
			}
		);

		console.log(paymentMethod.data, "paymentMethod");

		return {
			props: {
				user,
				paymentMethod: paymentMethod.data,
			},
		};
	} catch (error) {
		console.log(error);
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}
}
