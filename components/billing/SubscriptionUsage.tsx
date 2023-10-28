import { Subscription, Metric, User, Plan } from "@/payload-types";
import dayjs from "dayjs";

export interface Value {
	audioLength: number;
	keyPoints: KeyPoints;
	actionItems: ActionItems;
}

export interface KeyPoints {
	prompt_tokens: number;
	completion_tokens: number;
	total_tokens: number;
}

export interface ActionItems {
	prompt_tokens: number;
	completion_tokens: number;
	total_tokens: number;
}

type SubscriptionSectionProps = {
	subscription: Subscription[];
	userUsage: Metric[];
	user: User;
};

export default function SubscriptionSection({
	subscription,
	userUsage,
	user,
}: SubscriptionSectionProps) {
	if (subscription.length === 0) {
		return (
			<div className="mt-16 flex flex-col items-center border-b border-slate-6 pb-16">
				<div className="flex items-start gap-12">
					{/* Your subscription */}
					<h1>No tienes suscripcion</h1>
				</div>
			</div>
		);
	}

	const currentPlan = subscription[0]?.plan as Plan;

	function calculateUsage() {
		const data = userUsage.map((metric) => {
			const value = metric.value as unknown as Value;
			return {
				audioLength: value.audioLength ?? 0,
				keyPoints: value.keyPoints ?? {
					prompt_tokens: 0,
					completion_tokens: 0,
					total_tokens: 0,
				},
				actionItems: value.actionItems ?? {
					prompt_tokens: 0,
					completion_tokens: 0,
					total_tokens: 0,
				},
			};
		});

		const totalAudioLength = Math.round(data.reduce(
			(acc, curr) => acc + curr.audioLength,
			0
		) / 60);
		const totalKeyPoints = data.reduce(
			(acc, curr) => acc + curr.keyPoints.total_tokens,
			0
		);
		const totalActionItems = data.reduce(
			(acc, curr) => acc + curr.actionItems.total_tokens,
			0
		);
		const totalTokens = totalActionItems + totalKeyPoints;

		return {
			totalAudioLength,
			totalKeyPoints,
			totalActionItems,
			totalTokens,
		};
	}

	const { totalAudioLength, totalKeyPoints, totalActionItems, totalTokens } =
		calculateUsage();

	return (
		<div className="mt-16 flex flex-col items-center pb-16 w-full">
			<div className="stats stats-vertical lg:stats-horizontal shadow w-full">
				<div className="stat">
					<div className="stat-figure text-secondary">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							className="inline-block w-8 h-8 stroke-current"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							></path>
						</svg>
					</div>
					<div className="stat-title">Minutos grabado</div>
					<div className="stat-value">{totalAudioLength}~</div>
					<div className="stat-desc">
						desde el {dayjs(user.createdAt).format("DD/MM/YYYY")}
					</div>
				</div>

				<div className="stat">
					<div className="stat-figure text-secondary">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							className="inline-block w-8 h-8 stroke-current"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
							></path>
						</svg>
					</div>
					<div className="stat-title">Texto generado</div>
					<div className="stat-value">{totalTokens}</div>
					<div className="stat-desc">
						{" "}
						aproximadamente {(totalTokens / 15).toFixed(2)} paginas
					</div>
				</div>

				<div className="stat">
					<div className="stat-figure text-secondary">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							className="inline-block w-8 h-8 stroke-current"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
							></path>
						</svg>
					</div>
					<div className="stat-title">Total de uso</div>
					<div className="stat-value">{userUsage.length}</div>
					<div className="stat-desc">↘︎ de la app en general</div>
				</div>
			</div>
		</div>
	);
}
