import React from "react";
import Layout from "@/components/ui/layout/Layout";
import { GetServerSidePropsContext } from "next";
import axios from "axios";
import { apiUrl } from "@/env";
import getPayloadCookie from "@/utils/getPayloadCookie";
import {
	Currency,
	Metric,
	Order,
	PaymentMethod,
	Plan,
	Product,
	ProductPrice,
	Subscription,
	User,
} from "@/payload-types";
import { PaginatedDocs } from "@/utils/types";
import { routes } from "@/utils/routes";
import dayjs from "dayjs";
import SubscriptionSection from "@/components/billing/SubscriptionUsage";
import PlanCard from "@/components/billing/PlanCard";
import Link from "next/link";
import PaymentMethodSection from "@/components/billing/PaymentMethodSection";
import OrdersTable from "@/components/billing/OrdersTable";

type AccountProps = {
	paymentMethod: PaymentMethod[];
	products: Product[];
	subscription: Subscription[];
	userUsage: Metric[];
	user: User;
	orders: PaginatedDocs<Order>;
};

export default function Account({
	paymentMethod,
	products,
	subscription,
	userUsage,
	user,
	orders,
}: AccountProps) {
	const currentPlan = subscription && (subscription[0]?.plan as Plan);
	const periodicity = {
		monthly: "month",
		yearly: "year",
		// biannual: "",
		quaterly: "trimestre",
	};
	const [currentUserProductThatIsPlan] = products.filter(
		(product) => (product.productType as Plan).id === currentPlan?.id
	);

	return (
		<Layout>
			<div className="max-w-7xl flex flex-col gap-12 mx-auto px-8">
				{/* Greetings */}
				<div className="mt-16 flex items-center justify-between">
					<h1 className="text-4xl font-bold">
						Hola{" "}
						<span className="text-primary">
							{user?.firstName} {user?.lastName}
						</span>
					</h1>
					<div className="flex items-center gap-3">
						<p className="text-slate-11">Powered by</p>
						Summary App
					</div>
				</div>

				{subscription.length > 0 && (
					<SubscriptionSection
						subscription={subscription}
						user={user!}
						userUsage={userUsage}
					/>
				)}

				{currentUserProductThatIsPlan && (
					<div className="stats flex-wrap bg-primary-content text-primary">
						<div className="stat">
							<div className="stat-title">
								Tu subscripcion actual: {currentPlan.name}
							</div>
							<div className="stat-value">
								{
									(
										currentUserProductThatIsPlan.price as ProductPrice
									).price
								}{" "}
								{
									((
										currentUserProductThatIsPlan?.price as ProductPrice
									).currency as Currency)?.symbol
								}{" "}
							</div>
							<div className="stat-actions">
								<Link
									href="#plans"
									className="btn btn-sm btn-success"
								>
									Cambiar plan
								</Link>
							</div>
						</div>

						<div className="stat">
							<div className="stat-title my-2">Ultimo pago:</div>
							<div className="stat-value">
								{dayjs(subscription[0]?.createdAt).format(
									"DD/MM/YYYY"
								)}
							</div>
							<div className="stat-title my-2">Proximo pago:</div>
							<div className="stat-value">
								{dayjs(subscription[0]?.createdAt)
									.add(
										1,
										// @ts-ignore
										periodicity[
											// @ts-ignore
											subscription[0]?.periodicity!
										]
									)
									.format("DD/MM/YYYY")}
							</div>
							<div className="stat-actions">
								{/* <button className="btn btn-sm">guardar</button> */}
							</div>
						</div>
					</div>
				)}

				<div
					id="plans"
					className="mt-16 flex flex-col gap-12 border-b border-slate-6 pb-24 "
				>
					<p className="text-slate-11">Todos los planes</p>
					{!currentUserProductThatIsPlan && (
						<p className="text-slate-11">
							No tienes subscripcion, elige un plan
						</p>
					)}
					<div className="mx-auto flex flex-col items-start gap-6 md:flex-row">
						{/* <PlanCard product={products} currentUserProductThatIsPlan={currentUserProductThatIsPlan} /> */}
						{products.map((productThatIsPlan) => {
							return (
								<PlanCard
									key={productThatIsPlan.id}
									productThatIsPlan={productThatIsPlan}
									currentUserProductThatIsPlan={
										currentUserProductThatIsPlan
									}
								/>
							);
						})}
					</div>
				</div>
				{/* Billing details */}
				<div className="mb-40 mt-16">
					<div className="flex flex-wrap items-start gap-16">
						{/* Billing information */}

						<div className="flex flex-col md:flex-row items-start gap-16">
							<p className="text-slate-11">
								Informacion de facturacion
							</p>
							<div className="flex flex-col gap-8">
								<div className="flex flex-col gap-2">
									<p className="body-semibold">
										{user?.firstName} {user?.lastName}
									</p>
									<p className="text-slate-11">
										{user?.email}
									</p>
								</div>
							</div>
						</div>
						{/* Payment method */}
						<PaymentMethodSection paymentMethod={paymentMethod} />
					</div>
				</div>

				<OrdersTable orders={orders} />
			</div>
		</Layout>
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

		const products = await axios.get<PaginatedDocs<Product>>(
			`${apiUrl}/api/products`,
			{
				headers,
			}
		);

		const productThatArePlans = products.data.docs.filter(
			(product) => product.productType
		);

		const userSubscriptions = await axios.get<PaginatedDocs<Subscription>>(
			`${apiUrl}/api/subscriptions`,
			{
				headers,
			}
		);

		console.log(userSubscriptions.data, "userSubscriptions");

		const userUsage = await axios.get<PaginatedDocs<Metric>>(
			`${apiUrl}/api/metrics?limit=0`,
			{
				headers,
			}
		);

		console.log(userUsage.data, "userUsage");

		const userOrders = await axios.get<PaginatedDocs<Order>>(
			`${apiUrl}/api/orders`,
			{
				headers,
			}
		);

		return {
			props: {
				paymentMethod: paymentMethod.data.docs,
				products: productThatArePlans,
				subscription: userSubscriptions.data.docs,
				userUsage: userUsage.data.docs,
				user: user.user,
				orders: userOrders.data,
			},
		};
	} catch (error) {
		console.log(error, "error");
		return {
			redirect: {
				destination: routes.pages.login,
				permanent: false,
			},
		};
	}
}
