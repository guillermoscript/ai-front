import { routes } from "@/utils/routes";
import Link from "next/link";
import { useRouter } from "next/router";
import CollapsibleMenu from "../CollapsibleMenu";

const menuItems = [
	{
		title: "Subscripciones",
		subMenuItems: [
            {
                title: "Mis suscripciones",
                href: routes.pages.dashboard.subscriptions,
            }
		],
	},
	{
		title: "Cuenta de usuario",
		subMenuItems: [
			{
				title: "Mi cuenta",
                href: routes.pages.dashboard.account,
			},
		],
	},
	{
		title: "Ordenes",
		subMenuItems: [
            {
                title: "Mis ordenes",
                href: routes.pages.dashboard.orders,
            }
		],
	},
];

export default function AuthSidebar() {
	const { pathname } = useRouter();

	return (
		<aside className="bg-neutral-100 py-6 px-4 border-r border-neutral-300 hidden md:block overflow-y-auto">
			{menuItems.map((menuItem) => (
				<CollapsibleMenu key={menuItem.title} title={menuItem.title}>
					{menuItem.subMenuItems.map((subMenuItem) => (
						<Link key={subMenuItem.title} href={subMenuItem.href as string}>
							<SubMenuItem
								activeClass={
									pathname === subMenuItem.href
										? "bg-primary-500"
										: ""
								}
							>
								<p
									className={
										pathname === subMenuItem.href
											? "text-white"
											: ""
									}
								>
									{subMenuItem.title}
								</p>
							</SubMenuItem>
						</Link>
					))}
				</CollapsibleMenu>
			))}
		</aside>
	);
}

function SubMenuItem({
	children,
	activeClass = "",
}: {
	children: React.ReactNode;
	activeClass?: string;
}) {
	return (
		<div
			className={`my-[10px] text-neutral-800 text-sm p-[10px] hover:text-white hover:bg-primary-500 rounded-md w-full ${activeClass}`}
		>
			{children}
		</div>
	);
}
