import Layout from "@/components/ui/layout/Layout";
import { apiUrl } from "@/env";
import { Chat, User } from "@/payload-types";
import getPayloadCookie from "@/utils/getPayloadCookie";
import { routes } from "@/utils/routes";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { PaginatedDocs } from "@/utils/types";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { atom } from "jotai";
import CreateChatForm from "@/components/chat/CreateChatForm";
import SidebarChat from "@/components/chat/SidebarChat";
import DeleteChatModal from "@/components/chat/DeleteChatModal";
import ChatMenu from "@/components/chat/ChatMenu";
import ChatBody from "@/components/chat/ChatBody";
import ModelMenu from "@/components/chat/ChatModel/ModelMenu";
import UploadPdf from "@/components/chat/qa/UploadPdf";

type AudioPageProps = {
	user: User;
	chats: PaginatedDocs<Chat>;
};

function ChatPageHtml({ user, chats,hideSidebar, setHideSidebar, setOpen ,setOpenDeleteModal}: {
	user: User;
	chats: PaginatedDocs<Chat>;
	hideSidebar: boolean;
	setHideSidebar: React.Dispatch<React.SetStateAction<boolean>>;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	return (
		<div className="min-w-full border rounded lg:grid lg:grid-cols-3">
				{!hideSidebar && (
					<div className="border-r border-gray-300 lg:col-span-1">
						<SidebarChat chats={chats} />
					</div>
				)}
				<div
					className={`${
						hideSidebar ? "lg:col-span-3" : "lg:col-span-2"
					}`}
				>
					<div className="w-full">
						<div className="relative flex items-center p-3 border-b border-gray-300 justify-between">
							<span className="block ml-2 font-bold text-primary">
								Sumary App
							</span>
							<ModelMenu />
							<ChatMenu
								chats={chats}
								setOpen={setOpen}
								hideSidebar={hideSidebar}
								setHideSidebar={setHideSidebar}
								setOpenDeleteModal={setOpenDeleteModal}
							/>
						</div>
						{chats.docs.length > 0 ? (
							<ChatBody user={user} />
						) : (
							<div className="flex flex-col min-h-[700px] items-center gap-4 py-5">
								<h1 className="text-4xl font-bold text-secondary">
									Bienvenido a Summary App chat
								</h1>

								<ul className="list-disc list-inside">
									<li className="mb-2">
										Crea un chat para comenzar
									</li>
									<li className="mb-2">
										Chatear con un pdf 
									</li>
								</ul>

								<button
									className="btn btn-primary"
									onClick={() => setOpen(true)}
								>
									Crear Chat
								</button>
								<button
									className="btn btn-secondary"
									onClick={() => setHideSidebar(!hideSidebar)}
								>

								</button>
							</div>
						)}
					</div>
				</div>
			</div>
	)
}

function ChatPageContent({ user, chats }: AudioPageProps) {
	const [open, setOpen] = useState<boolean>(false);
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
	const [hideSidebar, setHideSidebar] = useState<boolean>(false);

	return (
		<>
			<ChatPageHtml
				user={user}
				chats={chats}
				hideSidebar={hideSidebar}
				setHideSidebar={setHideSidebar}
				setOpen={setOpen}
				setOpenDeleteModal={setOpenDeleteModal}
			/>

			{open && (
				<Modal open={open} onOpenChange={setOpen} title="Crear Chat">
					<CreateChatForm />
				</Modal>
			)}

			{openDeleteModal && (
				<DeleteChatModal
					open={openDeleteModal}
					onOpenChange={setOpenDeleteModal}
				/>
			)}
		</>
	);
}

export default function ChatPage({ user, chats }: AudioPageProps) {
	return (
		<>
			<Layout>
				<ChatPageContent user={user} chats={chats} />
			</Layout>
		</>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const token = getPayloadCookie(context);

	const headers = {
		Authorization: `JWT ${token}`,
	};
	try {
		const { data: user } = await axios.get(`${apiUrl}/api/users/me`, {
			headers,
		});

		const chats = await axios.get(`${apiUrl}/api/chats`, {
			headers,
		});

		return {
			props: {
				user: user.user,
				chats: chats.data,
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
