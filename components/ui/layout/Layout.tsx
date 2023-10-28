import Header from "../Header";

type LayoutProps = {
	children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
	return (
		<div className="flex flex-col min-h-screen w-full">
            <Header />
			<main className="flex-1 w-full px-0 py-8 pb-0 mx-auto md:px-8 md:py-16">
				{children}
			</main>
		</div>
	);
}
