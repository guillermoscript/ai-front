import AccountForm from "@/components/account/AccountForm";
import AccountLayout from "@/components/ui/layout/AccountLayout";
import { apiUrl } from "@/env";
import { User } from "@/payload-types";
import getPayloadCookie from "@/utils/getPayloadCookie";
import axios from "axios";
import { GetServerSidePropsContext } from "next";

type AccountPageProps = {
	user: User;
};

export default function Account({ user }: AccountPageProps) {
	console.log(user, "user")
    return (
		<AccountLayout>
			<div className="space-y-6">
				<div>
					<h3 className="text-lg font-medium">Account</h3>
					<p className="text-sm text-muted-foreground">
						Update your account settings. Set your preferred
						language and timezone.
					</p>
				</div>
				<AccountForm user={user} />
			</div>
		</AccountLayout>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const token = getPayloadCookie(context);

	const headers = {
		Authorization: `JWT ${token}`,
	};

	console.log(headers);

	try {
		const user = await axios.get(`${apiUrl}/api/users/me`, {
			headers,
		});

		console.log(user, "user");

		return {
			props: {
				user: user?.data.user,
			},
		};
	} catch (error) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		}
	}
}