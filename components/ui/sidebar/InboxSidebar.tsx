import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Button } from "../button";
import { Audio, Chat } from "@/payload-types";
import { PaginatedDocs } from "@/utils/types";
import Link from "next/link";
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/components/ui/command";

type InboxSidebarProps = {
	audios: PaginatedDocs<Audio>;
};

export default function InboxSidebar({ audios }: InboxSidebarProps) {
	return (
		<div className="pb-12 hidden md:block md:min-h-screen md:max-h-screen ">
			<div className="py-2 overflow-y-auto">
				<Link
					href="/dashboard/inbox"
					className="flex gap-3 px-4 items-center btn btn-ghost btn-sm mx-2"
				>
					<svg
						width="18"
						height="18"
						viewBox="0 0 18 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M9.00005 1.80005L9.00005 16.2M16.2 9.00005L1.80005 9.00005"
							stroke="#131313"
							strokeWidth="2"
							strokeLinecap="round"
						/>
					</svg>
					<h2 className="text-lg font-semibold tracking-tight">
						Agregar Audio
					</h2>
				</Link>

				<h3 className="px-4 mt-4 mb-2 text-sm font-semibold tracking-tight text-gray-500 uppercase">
					Tus audios
				</h3>

				<Command className="rounded-lg border shadow-md h-full">
					<CommandInput placeholder="Buscar..." />
					<CommandList className="h-full max-h-[calc(100vh-8rem)]">
						<CommandEmpty> No se encontraron audios</CommandEmpty>
						<CommandGroup heading="Audios">
							<div className="space-y-1 p-2">
								{audios.docs.length > 0 ? (
									audios.docs.map((audio) => (
										<CommandItem key={audio.id}>
											<Link
												href={`/dashboard/inbox/${audio.id}`}
												className="w-full btn btn-ghost btn-sm flex items-center justify-start"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
													className="mr-1 h-4 w-4"
												>
													<path d="M21 15V6" />
													<path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
													<path d="M12 12H3" />
													<path d="M16 6H3" />
													<path d="M12 18H3" />
												</svg>
												<p className="text-ellipsis text-xs truncate w-60 text-left">
													{audio.filename}
												</p>
											</Link>
										</CommandItem>
									))
								) : (
									<CommandItem>
										<div className="flex flex-col min-h-[700px] items-center justify-center py-5">
											<Link
												className="btn btn-primary mt-8"
												href="/dashboard/inbox/upload"
											>
												Subir Audio
											</Link>
										</div>
									</CommandItem>
								)}
							</div>
						</CommandGroup>
						<CommandSeparator />
						<CommandGroup heading="Settings">
							<CommandItem>
								<span>Profile</span>
								<CommandShortcut>⌘P</CommandShortcut>
							</CommandItem>
							<CommandItem>
								<span>Mail</span>
								<CommandShortcut>⌘B</CommandShortcut>
							</CommandItem>
							<CommandItem>
								<span>Settings</span>
								<CommandShortcut>⌘S</CommandShortcut>
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
			</div>
		</div>
	);
}
