const features = [
	"Individual configuration",
	"No setup or hidden fees",
	"Team size: 1 developer",
	"Premium support: 6 months",
	"Free updates: 6 months",
];

export default function PricingSection() {
	return (
		<section className="w-full bg-base-200">
			<div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
				<div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
					<h2 className="mb-4 text-4xl tracking-tight font-extrabold text-primary">
						Designed for business teams like yours
					</h2>
					<p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
						Here at Flowbite we focus on markets where technology,
						innovation, and capital can unlock long-term value and
						drive economic growth.
					</p>
				</div>
				<div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
					<PricingCard
						title="Starter"
						description="Best option for personal use & for your next project."
						price="$29"
						features={features}
						buttonText="Get started"
					/>
					<PricingCard
						title="Professional"
						description="Best option for personal use & for your next project."
						price="$99"
						features={features}
						buttonText="Get started"
					/>
					<PricingCard
						title="Enterprise"
						description="Best option for personal use & for your next project."
						price="$299"
						features={features}
						buttonText="Get started"
					/>
				</div>
			</div>
		</section>
	);
}

type PricingCardProps = {
	title: string;
	description: string;
	price: string;
	features: string[];
	buttonText: string;
};

function PricingCard({
	title,
	description,
	price,
	features,
	buttonText,
}: PricingCardProps) {
	return (
		<div className="flex flex-col p-6 mx-auto max-w-lg text-center  bg-base-300 rounded-lg border border-base-100 shadow  xl:p-8">
			<h3 className="mb-4 text-2xl font-semibold">{title}</h3>
			<p className="font-light  sm:text-lg ">
				{description}
			</p>
			<div className="flex justify-center items-baseline my-8">
				<span className="mr-2 text-5xl font-extrabold">{price}</span>
				<span className="">/month</span>
			</div>

			<ul role="list" className="mb-8 space-y-4 text-left">
				{features.map((feature) => (
					<li key={feature} className="flex items-center space-x-3">
						<svg
							className="flex-shrink-0 w-5 h-5 text-accent"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clipRule="evenodd"
							></path>
						</svg>
						<span>{feature}</span>
					</li>
				))}
			</ul>
			<a
				href="#"
				className="btn btn-primary w-full"
			>
				{buttonText}
			</a>
		</div>
	);
}
