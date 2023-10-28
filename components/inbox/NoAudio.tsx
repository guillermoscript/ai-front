import Link from "next/link";
import Header from "../ui/Header";
import { LayoutDashboardV2 } from "../ui/layout/LayoutDashboard";
import Image from "next/image";

export default function NoAudio() {
	return (
		<LayoutDashboardV2
			header={<Header />}
			sidebar={
				<>
					<aside className="w-72 bg-white border-r border-border">
						<div className="flex flex-col h-full">
							<div className="flex items-center justify-between px-4 py-3">
								<div className="space-y-1">
									<div className="flex items-center space-x-2">
										<Link href={`/dashboard/inbox/`}>
											<Image
												src="/icons/arrow-left.svg"
												alt="arrow left"
												width={20}
												height={20}
											/>
										</Link>
										<h2 className="text-2xl font-semibold tracking-tight">
											Subir Audio
										</h2>
									</div>
								</div>
							</div>
						</div>
					</aside>
				</>
			}
		>
			<div className="flex flex-col min-h-screen w-full px-8 py-4">
				<div className="flex items-center justify-between">
					<div className="space-y-1">
						<div className="flex items-center space-x-2">
							<Link href={`/dashboard/inbox/`}>
								<Image
									src="/icons/arrow-left.svg"
									alt="arrow left"
									width={20}
									height={20}
								/>
							</Link>
							<h2 className="text-2xl font-semibold tracking-tight">
								Subir Audio
							</h2>
						</div>
					</div>
				</div>
			</div>
		</LayoutDashboardV2>
	);
}
