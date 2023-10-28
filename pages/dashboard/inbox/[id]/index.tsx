import Header from "@/components/ui/Header";
import Modal from "@/components/ui/Modal";
import { LayoutDashboardV2 } from "@/components/ui/layout/LayoutDashboard";
import InboxSidebar from "@/components/ui/sidebar/InboxSidebar";

import { apiUrl } from "@/env";
import useRefreshServerProps from "@/hooks/useRefreshServerProps";
import { Audio, User, UserTranscription } from "@/payload-types";
import getPayloadCookie from "@/utils/getPayloadCookie";
import { routes } from "@/utils/routes";
import { PaginatedDocs } from "@/utils/types";
import axios from "axios";
import dayjs from "dayjs";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import useMutationTranscriptionMarkdown from "@/components/inbox/hooks/useMutationTranscriptionMarkdown";
import TranscriptionSection from "@/components/inbox/TranscriptionSection";
import { Progress } from "@/components/ui/progress";
import ViewMarkdown from "@/components/ui/makrdown/ViewMarkdown";
import TranscriptionSectionTabs from "@/components/inbox/TranscriptionSectionTabs";

type InboxPageProps = {
	user: User;
	audios: PaginatedDocs<Audio>;
	audio: Audio;
	transcription: PaginatedDocs<UserTranscription>;
};

export default function InboxPage({
	user,
	audios,
	audio,
	transcription,
}: InboxPageProps) {

	return (
		<>
			<LayoutDashboardV2
				header={<Header />}
				sidebar={<InboxSidebar audios={audios} />}
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
									{audio.filename}
								</h2>
							</div>
							<p className="text-sm text-muted-foreground">
								{dayjs(audio.createdAt).format("DD/MM/YYYY")}
							</p>
						</div>
					</div>
					<div
						data-orientation="horizontal"
						role="none"
						className="shrink-0 bg-border h-[1px] w-full my-4"
					></div>
					{transcription.docs.length > 0 ? (
						<TranscriptionSectionTabs
							transcription={transcription.docs[0]!}
						/>
					) : (
						<TranscriberForm audio={audio} />
					)}
				</div>
			</LayoutDashboardV2>
		</>
	);
}

function TranscriberForm({ audio }: any) {
	const transcriptionMarkdownMutation = useMutationTranscriptionMarkdown();
	const { refreshData } = useRefreshServerProps();

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		transcriptionMarkdownMutation.mutate(
			{
				audioId: audio.id,
			},
			{
				onSuccess: (data) => {
					console.log(data);
					refreshData();
				},
			}
		);
	}

	return (
		<form
			onSubmit={onSubmit}
			className="flex flex-col items-center justify-center py-5 gap-3"
		>
			{transcriptionMarkdownMutation.isLoading ? (
				<p className="">Transcribiendo...</p>
			) : (
				<p className="">Transcribe tu audio</p>
			)}

			<button
				disabled={transcriptionMarkdownMutation.isLoading}
				className="btn btn-primary animate-pulse"
			>
				Transcribir Audio
			</button>
			{transcriptionMarkdownMutation.isError && (
				<div className="text-error">
					<p className="mb-2">
						Error al transcribir, intenta de nuevo más tarde
					</p>
				</div>
			)}
		</form>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const token = getPayloadCookie(context);
	const audioId = context.params?.id;

	const headers = {
		Authorization: `JWT ${token}`,
	};

	try {
		const { data: user } = await axios.get(`${apiUrl}/api/users/me`, {
			headers,
		});

		const audios = await axios.get(`${apiUrl}/api/audios`, {
			headers,
			params: {
				limit: 0,
			},
		});

		const audio = await axios.get(`${apiUrl}/api/audios/${audioId}`, {
			headers,
		});

		const transcription = await axios.get(
			`${apiUrl}/api/user-transcriptions/?where[audio][equals]=${audioId}`,
			{
				headers,
			}
		);

		console.log(transcription.data, "transcription data");
		console.log(audio.data, "audio data");

		return {
			props: {
				user: user.user,
				audios: audios.data,
				audio: audio.data,
				transcription: transcription.data,
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
