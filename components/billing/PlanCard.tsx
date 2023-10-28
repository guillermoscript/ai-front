import { Plan, ProductPrice, Currency, Product } from "@/payload-types";
import clsx from "clsx";
import { RichText } from "../ui/RichText";
import Link from "next/link";

export default function PlanCard({
	productThatIsPlan,
	currentUserProductThatIsPlan,
}: {
	productThatIsPlan: Product;
	currentUserProductThatIsPlan?: Product;
}) {
	const plan = productThatIsPlan.productType as Plan;
	const price = (productThatIsPlan.price as ProductPrice).price;
	const symbol = (
		(productThatIsPlan.price as ProductPrice).currency as Currency
	).symbol;
	const currency = (
		(productThatIsPlan.price as ProductPrice).currency as Currency
	).name;

	return (
		<div
			className={clsx(
				"flex h-[353px] flex-col gap-8 rounded-lg bg-primary-content px-6 py-12"
				// plan.planId === currentPlan.planId
				// 	? "border-[3px] border-crimson-6"
				// 	: ""
			)}
		>
			<div className="flex flex-col gap-2">
				<h6 className="body-semibold text-slate-12">{plan.name}</h6>
				<div className="flex items-center gap-3">
					<h5 className="text-[32px] font-bold leading-9">
						{symbol} {price}
					</h5>
					<div className="flex flex-col items-start">
						<span className="text-sm font-semibold">
							{currency}
						</span>
						<span className="text-sm text-light">
							Billed {plan.periodicity}
						</span>
					</div>
				</div>
			</div>
			{/* <button className="btn btn-primary">Comprar</button> */}
			{currentUserProductThatIsPlan ? (
				currentUserProductThatIsPlan.id === productThatIsPlan.id ? (
					<p className="text-sm font-semibold text-center">
						Current plan
					</p>				
				) : (
					<Link
						className="btn btn-primary"
						href={`/checkout/${productThatIsPlan.id}`}
					>
						Buy
					</Link>
				)
			) : (
				<Link
					className="btn btn-primary"
					href={`/checkout/${productThatIsPlan.id}`}
				>
					Buy
				</Link>
			)}

			<div className="flex flex-col gap-4">
				{productThatIsPlan.info && (
					<RichText content={productThatIsPlan.info} />
				)}
			</div>
		</div>
	);
}
