import { PaymentMethod } from "@/payload-types";
import Image from "next/image";

type PaymentMethodSectionProps = {
	paymentMethod: PaymentMethod[];
};

export default function PaymentMethodSection({
	paymentMethod,
}: PaymentMethodSectionProps) {

	const isSelectingPaymentMethod = paymentMethod.find(
		(el) => el.default === true
	);

	if (!paymentMethod || paymentMethod.length === 0 || !isSelectingPaymentMethod) {
		return (
			<div className="flex flex-col md:flex-row items-start gap-16">
				<p className="text-slate-11">Metodos de pago</p>
				<div className="flex gap-4">
					<Image
						src="/icons/credit-card.svg"
						alt="Credit card"
						width={24}
						height={24}	
					/>
					<div className="flex flex-col gap-2">
						<p className="body-semibold">No hay metodos de pago</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col md:flex-row items-start gap-16">
			<p className="text-slate-11">Metodos de pago</p>
			<div className="flex gap-4">
				<Image
					src="/icons/credit-card.svg"
					alt="Credit card"
					width={24}
					height={24}
				/>
				<div className="flex flex-col gap-2">
					<p className="body-semibold">
						{isSelectingPaymentMethod.title}
					</p>
				</div>
			</div>
		</div>
	);
}