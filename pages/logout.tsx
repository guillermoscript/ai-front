import React, { useEffect, useState } from "react";
import Link from "next/link";

import classes from "./index.module.scss";
import { useAuth } from "@/providers/Auth";
import { routes } from "@/utils/routes";
import Layout from "@/components/ui/layout/Layout";

const Logout: React.FC = () => {
	const { logout } = useAuth();
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		const performLogout = async () => {
			try {
				await logout();
				setSuccess("Logged out successfully.");
			} catch (_) {
				setError("You are already logged out.");
			}
		};

		performLogout();
	}, [logout]);

	return (
		<Layout>
			{(error || success) && (
				<div className="flex items-center justify-center min-h-[calc(80vh-64px)]">
					<div className="p-1 rounded shadow-lg bg-gradient-to-r from-purple-500 via-green-500 to-blue-500">
						<div className="flex flex-col items-center p-4 space-y-2 bg-white">
							<h1>{error || success}</h1>

							<p>
								{"What would you like to do next? "}
								<Link
									className="text-sm font-medium text-secondary btn-link"
									href={routes.pages.home}
								>
									Click here
								</Link>
							</p>
							<p>
								{` to go to the home page. To log back in, `}
								<Link
									className="text-sm font-medium text-primary btn-link"
									href={routes.pages.login}
								>
									Click here
								</Link>
							</p>
						</div>
					</div>
				</div>
			)}
		</Layout>
	);
};

export default Logout;
