import TabUpload from "@/components/audioPage/TabUpload";
import Header from "@/components/ui/Header";
import Modal from "@/components/ui/Modal";
import { LayoutDashboardV2 } from "@/components/ui/layout/LayoutDashboard";
import InboxSidebar from "@/components/ui/sidebar/InboxSidebar";
import { apiUrl } from "@/env";
import getPayloadCookie from "@/utils/getPayloadCookie";
import { routes } from "@/utils/routes";
import tryCatch from "@/utils/tryCatch";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import { InboxPageProps } from ".";
import RecordAudioForm from "@/components/audioPage/RecordAudioForm";

export default function InboxPage({ user, audios }: InboxPageProps) {
    
	return (
		<>
            <LayoutDashboardV2
                header={<Header />}
                sidebar={<InboxSidebar audios={audios} />}
            >
                <div className="flex flex-col min-h-screen w-full p-3">
                    <RecordAudioForm />
                </div>
            </LayoutDashboardV2>
			
		</>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const token = getPayloadCookie(context);

	const headers = {
		Authorization: `JWT ${token}`,
	};
	try {
		const [userData, userError] = await tryCatch(
			axios.get(`${apiUrl}/api/users/me`, {
				headers,
			})
		)

		if (userError) {
			throw userError;
		}

		console.log(userData?.data, "userData.data")

		const [audios, audiosError] = await tryCatch(axios.get(`${apiUrl}/api/audios`, {
			headers,
			params: {
                limit: 0
            }
		}));

		if (audiosError) {
			console.log(audiosError, "audiosError");
		}

		console.log(audios?.data, "audios.data")

		return {
			props: {
				user: userData?.data.user,
				audios: audios?.data,
			},
		};
	} catch (error) {
		console.log(error, "error");
		// console.log(error.response.data);
		return {
			redirect: {
				destination: routes.pages.login,
				permanent: false,
			},
		};
	}
}
