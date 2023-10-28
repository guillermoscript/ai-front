import { cn } from "@/utils";
import { routes } from "@/utils/routes";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "../Header";

const sidebarNavItems = [
	{
		title: "Profile",
		href: routes.pages.dashboard.account.index
	},
	{
		title: "Payment Methods",
		href: routes.pages.dashboard.account.payment
	},
];

type AccountLayoutProps = {
	children: React.ReactNode;
};

export default function AccountLayout({ children }: AccountLayoutProps) {
	return (
		<>
            <Header />
			<div className="hidden space-y-6 p-10 pb-16 md:block">
				<div className="space-y-0.5">
					<h2 className="text-2xl font-bold tracking-tight">
						Settings
					</h2>
					<p className="text-muted-foreground">
						Desde aqui puedes editar tu perfil
					</p>
				</div>
				<div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
					<aside className="-mx-4 lg:w-1/5">
						<SidebarNav items={sidebarNavItems} />
					</aside>
					<div className="flex-1 lg:max-w-2xl">{children}</div>
				</div>
			</div>
		</>
	);
}
interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
	items: {
		href: string;
		title: string;
	}[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {

	return (
		<nav
			className={cn(
				"flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
				className
			)}
			{...props}
		>
			{items.map((item) => (
				<Link
					key={item.href}
					href={item.href}
					className="flex items-center px-4 py-2 space-x-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
				>
					{item.title}
				</Link>
			))}
		</nav>
	);
}
