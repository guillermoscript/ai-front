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
import axios, { AxiosResponse } from "axios";
import dayjs from "dayjs";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import useMutationTranscriptionMarkdown from "@/components/inbox/hooks/useMutationTranscriptionMarkdown";
import TranscriptionSection from "@/components/inbox/TranscriptionSection";
import { Progress } from "@/components/ui/progress";
import tryCatch from "@/utils/tryCatch";
import NoAudio from "@/components/inbox/NoAudio";
import TranscriptionSectionEdit from "@/components/inbox/TranscriptionSectionEdit";

type InboxPageProps = {
	user: User;
	audios: PaginatedDocs<Audio> | null;
	audio: Audio | null;
	transcription: PaginatedDocs<UserTranscription> | null;
};

export default function SummaryAudioPage({
	user,
	audios,
	audio,
	transcription,
}: InboxPageProps) {
	
	const transcriptionMarkdownMutation = useMutationTranscriptionMarkdown();
	const { refreshData } = useRefreshServerProps();


    if (!audio || !transcription || !audios) {
        return (
			<NoAudio />
		);
    }


	return (
		<>
			<LayoutDashboardV2
				header={<Header />}
				sidebar={<InboxSidebar audios={audios}  />}
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
						<TranscriptionSectionEdit
							transcription={transcription.docs[0]!.transcriptionText!}
							transcriptionId={transcription.docs[0]!.id}
						/>
					) : (
						<div className="flex flex-col items-center justify-center py-5">
							{transcriptionMarkdownMutation.isLoading ? (
								<p className="mb-2">Transcribiendo...</p>
							) : (
								<p className="mb-2">Transcribe tu audio</p>
							)}

							<button
								disabled={
							
									transcriptionMarkdownMutation.isLoading
								}
								onClick={() => {
									transcriptionMarkdownMutation.mutate({
										audioId: audio.id,
									},
									{
										onSuccess: (data) => {
											console.log(data);
											refreshData();
										},
									});
								}}
								className="btn btn-primary animate-pulse"
							>
								Transcribir Audio
							</button>
						</div>
					)}
				</div>
			</LayoutDashboardV2>
		</>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const token = getPayloadCookie(context);
	const audioId = context.params?.id;

	const headers = {
		Authorization: `JWT ${token}`,
	};

		const [userData, userError] = await tryCatch<AxiosResponse<any>>(axios.get(`${apiUrl}/api/users/me`, {
			headers,
		}));

        if (userError) {
            console.log(userError, "userError");
		    // console.log(error.response.data);
            return {
                redirect: {
                    destination: routes.pages.login,
                    permanent: false,
                },
            };
        }

		const [audios, audiosError] = await tryCatch(axios.get(`${apiUrl}/api/audios`, {
			headers,
			params: {
				limit: 0,
			},
		}));

        if (audiosError) {
            console.log(audiosError, "audiosError");
        }

		const [audio, audioError] = await tryCatch(axios.get(`${apiUrl}/api/audios/${audioId}`, {
			headers,
		}));

        if (audioError) {
            console.log(audioError, "audioError");
        }

		const [transcription, transcriptionError] = await tryCatch(
			axios.get(
				`${apiUrl}/api/user-transcriptions/?where[audio][equals]=${audioId}`,
				{
					headers,
				}
			)
		);

        if (transcriptionError) {
            console.log(transcriptionError, "transcriptionError");
        }

		return {
			props: {
				user: userData?.data.user,
				audios: audios?.data || null,
				audio: audio?.data || null,
				transcription: transcription?.data || null,
			},
		};
		
}
