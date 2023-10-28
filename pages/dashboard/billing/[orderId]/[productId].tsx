import PlanCard from "@/components/billing/PlanCard";
import CheckoutCard from "@/components/checkout/CheckoutCard";
import Layout from "@/components/ui/layout/Layout";
import { apiUrl } from "@/env";
import { Currency, Order, Product, ProductPrice } from "@/payload-types";
import getPayloadCookie from "@/utils/getPayloadCookie";
import axios from "axios";
import { GetServerSidePropsContext } from "next";

type OrderCheckoutProps = {
	product?: Product;
	order: Order;
};

export default function OrderCheckout({ product, order }: OrderCheckoutProps) {
	if (!product) {
		return (
			<Layout>
				<div className="container mx-auto px-6">
					<h1 className="text-gray-700 text-2xl font-medium">
						No product found
					</h1>
				</div>
			</Layout>
		);
	}

	return (
		<Layout>
			<div className="container mx-auto px-6">
				<h3 className="text-gray-700 text-2xl font-medium">Checkout</h3>
				<p>Checkout for {product.name}</p>
				<div className="flex flex-col justify-between gap-4 lg:flex-row mt-8">
					<CheckoutCard product={product} />

					<div className="w-full flex flex-col gap-3 mb-8 flex-shrink-0 order-1 lg:w-1/2 lg:mb-0 lg:order-2">
						<h4 className="text-lg font-medium">
							Order #{order.id}
						</h4>
						<div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
							<h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
								Summary
							</h3>
							<div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
								<div className="flex justify-between w-full">
									<p className="text-base dark:text-white leading-4 text-gray-800">
										Subtotal
									</p>
									<p className="text-base dark:text-gray-300 leading-4 text-gray-600">
										{
											(product?.price as ProductPrice)
												?.price
										}{" "}
										{
											(
												(product?.price as ProductPrice)
													?.currency as Currency
											)?.symbol
										}
									</p>
								</div>
								{/* <div className="flex justify-between items-center w-full">
									<p className="text-base dark:text-white leading-4 text-gray-800">
										Discount{" "}
										<span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">
											STUDENT
										</span>
									</p>
									<p className="text-base dark:text-gray-300 leading-4 text-gray-600">
										-$28.00 (50%)
									</p>
								</div> */}
							</div>
							<div className="flex justify-between items-center w-full">
								<p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
									Total
								</p>
								<p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
									{(product?.price as ProductPrice)?.price}{" "}
									{
										(
											(product?.price as ProductPrice)
												?.currency as Currency
										)?.symbol
									}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const productId = context.params?.productId as string;
	const orderId = context.params?.orderId as string;

	const token = getPayloadCookie(context);

	if (!token) {
		return {
			redirect: {
				destination: "/create-account",
				permanent: false,
			},
		};
	}

	const headers = {
		Authorization: `JWT ${token}`,
	};

	try {
		const { data: user } = await axios.get(`${apiUrl}/api/users/me`, {
			headers,
		});

		if (!user) {
			console.log(user, "user");
			return {
				redirect: {
					destination: "/create-account",
					permanent: false,
				},
			};
		}

		const order = await axios.get<Order>(
			`${apiUrl}/api/orders/${orderId}`,
			{
				headers,
				params: {
					depth: 3,
				},
			}
		);

		const product = order.data?.products?.find(
			(product) => (product as Product).id === productId
		) as Product;

		return {
			props: {
				product: product,
				order: order.data,
			},
		};
	} catch (error) {
		console.log(error, "error");
		return {
			redirect: {
				destination: "/create-account",
				permanent: false,
			},
		};
	}
}
