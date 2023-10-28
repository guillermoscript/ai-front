import TabUpload from "@/components/audioPage/TabUpload";
import CreateChatForm from "@/components/chat/CreateChatForm";
import Header from "@/components/ui/Header";
import Modal from "@/components/ui/Modal";
import { LayoutDashboardV2 } from "@/components/ui/layout/LayoutDashboard";
import InboxSidebar from "@/components/ui/sidebar/InboxSidebar";
import { apiUrl } from "@/env";
import { Audio, Chat, User } from "@/payload-types";
import getPayloadCookie from "@/utils/getPayloadCookie";
import { routes } from "@/utils/routes";
import tryCatch from "@/utils/tryCatch";
import { PaginatedDocs } from "@/utils/types";
import axios, { AxiosError } from "axios";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useState } from "react";

export type InboxPageProps = {
	user: User;
	audios: PaginatedDocs<Audio>;
};

export default function InboxPage({ user, audios }: InboxPageProps) {


	if (!audios) {
		return (
			<LayoutDashboardV2
				header={<Header />}
				sidebar={
					<div className="flex flex-col justify-between h-full">
						<h4 className="text-lg font-semibold text-gray-500">
							No tienes audios
						</h4>
						<Link
							className="btn btn-primary mt-8"
							href="/dashboard/inbox/upload"
						>
							Subir Audio
						</Link>
					</div>
				}
			>
				<div className="p-8 flex h-full flex-col space-y-6">
					<div className=" text-4xl font-bold text-primary">
						Bienvenido a Summary App
					</div>
					<div className=" text-lg ">
						<div className="mb-8">
							Summary App hace que sea fácil crear resúmenes desde
							tus audios.
						</div>
						<div className="mb-2 font-bold">¿Cómo funciona?</div>
					</div>
					<div className="">
						<ul className="list-disc list-inside">
							<li className="mb-2">
								Sube un audio o graba uno nuevo.
							</li>
							<li className="mb-2">
								El audio debe ser menor a 120MB.
							</li>
							<li className="mb-2">
								Debe ser en uno de los siguientes formatos:
								.mp3, .wav, .m4a, .ogg, webm.
							</li>
							<li className="mb-2">
								Dale click al botón de transcribir.
							</li>
							<li className="mb-2">
								Espera a que se transcriba el audio.
							</li>
							<li className="mb-2">
								Una vez transcrita, puedes editar la
								transcripción.
							</li>
							<li className="mb-2">
								Una vez editada, puedes crear un resumen y
								editarlo si lo deseas.
							</li>
							<li className="mb-2">Listo 🎉</li>
						</ul>
						<div className="mt-8 flex items-center gap-3 justify-center">
							<Link
								className="btn btn-primary mt-8"
								href="/dashboard/inbox/upload"
							>
								Subir Audio
							</Link>
							{/* <Link
								className="btn btn-secondary mt-8"
								href="/dashboard/inbox/record"
							>
								Grabar
							</Link> */}
						</div>
					</div>
				</div>
			</LayoutDashboardV2>
		);
	}

	return (
		<>
			<LayoutDashboardV2
				header={<Header />}
				sidebar={<InboxSidebar audios={audios} />}
			>
				<div className="p-8 flex h-full flex-col space-y-6">
					<div className=" text-4xl font-bold text-primary">
						Bienvenido a Summary App
					</div>
					<div className=" text-lg ">
						<div className="mb-8">
							Summary App hace que sea fácil crear resúmenes desde
							tus audios.
						</div>
						<div className="mb-2 font-bold">¿Cómo funciona?</div>
					</div>
					<div className="">
						<ul className="list-disc list-inside">
							<li className="mb-2">
								Sube un audio o graba uno nuevo.
							</li>
							<li className="mb-2">
								El audio debe ser menor a 120MB.
							</li>
							<li className="mb-2">
								Debe ser en uno de los siguientes formatos:
								.mp3, .wav, .m4a, .ogg, webm.
							</li>
							<li className="mb-2">
								Dale click al botón de transcribir.
							</li>
							<li className="mb-2">
								Espera a que se transcriba el audio.
							</li>
							<li className="mb-2">
								Una vez transcrita, puedes editar la
								transcripción.
							</li>
							<li className="mb-2">
								Una vez editada, puedes crear un resumen y editarlo si lo deseas.
							</li>
							<li className="mb-2">Listo 🎉</li>
						</ul>
						<div className="mt-8 flex items-center gap-3 justify-center">
							<Link
								className="btn btn-primary mt-8"
								href="/dashboard/inbox/upload"
							>
								Subir Audio
							</Link>
							{/* <Link
								className="btn btn-secondary mt-8"
								href="/dashboard/inbox/record"
							>
								Grabar
							</Link> */}
						</div>
					</div>
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

	console.log(headers);
	try {
		const [userData, userError] = await tryCatch(
			axios.get(`${apiUrl}/api/users/me`, {
				headers,
			})
		);

		if (userError || !userData?.data || !userData?.data.user) {
			throw userError;
		}

		console.log(userData?.data, "userData.data");

		const [audios, audiosError] = await tryCatch(
			axios.get(`${apiUrl}/api/audios`, {
				headers,
				params: {
					limit: 0
				}
			})
		);

		if (audiosError) {
			console.log((audiosError as AxiosError).response?.data, "audiosError");

			return {
				props: {
					user: userData?.data.user,
					audios: null,
				},
			};
		}

		console.log(audios?.data, "audios.data");

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
