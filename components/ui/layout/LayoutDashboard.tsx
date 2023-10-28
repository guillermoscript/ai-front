
type LayoutType = {
    children: React.ReactNode;
	header: React.ReactNode;
	sidebar: React.ReactNode;
};

export default function LayoutDashboard({ children, header, sidebar }: LayoutType) {
	return (
		<div className="flex h-screen bg-white">
			<div className="flex flex-col flex-1 w-full">
				{header}
				<div className="flex flex-1 overflow-hidden">
					{sidebar}
					<main className="flex-1 p-8 overflow-y-auto">
						{children}
					</main>
				</div>
			</div>
		</div>
	);
}

export function LayoutDashboardV2({ children, header, sidebar }: LayoutType) {
	return (
		<div className="flex h-screen bg-base-100">
				<div className="flex flex-col flex-1 w-full">
					{header}
					{/* <div className="flex flex-1 overflow-hidden"> */}
					<div className="grid lg:grid-cols-5">
						{sidebar}
						<main className="col-span-3 lg:col-span-4 lg:border-l">
							{children}
                        </main>
					</div>
				</div>
			</div>
	)
}