import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ViewMarkdown from "@/components/ui/makrdown/ViewMarkdown";
import TranscriptionSectionEdit from "./TranscriptionSectionEdit";
import SummarySection from "./SumarrySection";
import { UserTranscription } from "@/payload-types";
import DeleteAudioForm from "./DeleteAudioForm";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

type TranscriptionSectionProps = {
	transcription: UserTranscription;
	title: string;
	description: string;
	children: React.ReactNode;
};

export default function TranscriptionSection({
	transcription,
	title,
	description,
	children,
}: TranscriptionSectionProps) {
	return (
		// <Tabs defaultValue="view" className="w-full gap-3">
		// 	<TabsList>
		// 		<TabsTrigger value="view">Ver</TabsTrigger>
		// 		<TabsTrigger value="edit">Editar</TabsTrigger>
		// 		<TabsTrigger value="summary">Resumir</TabsTrigger>
		// 		<TabsTrigger value="delete">Eliminar</TabsTrigger>
		// 	</TabsList>
		// 	<TabsContent value="view">
		// 		<div className="flex flex-col py-5 ">
		// 			<ViewMarkdown value={transcription.transcriptionText!} />
		// 		</div>
		// 	</TabsContent>
		// 	<TabsContent value="edit">
		// 		<TranscriptionSectionEdit
		// 			transcriptionId={transcription.id}
		//             transcription={transcription.transcriptionText!}
		// 		/>
		// 	</TabsContent>
		// 	<TabsContent value="summary">
		// 		<SummarySection transcription={transcription} />
		// 	</TabsContent>
		// 	<TabsContent value="delete">
		// 		<DeleteAudioForm transcription={transcription} />
		// 	</TabsContent>
		// </Tabs>
		<>
			<div className="flex flex-col gap-3">
				<div className="space-y-1">
					<h4 className="text-sm font-medium leading-none">
						{title}
					</h4>
					<p className="text-sm text-muted-foreground">
						{description}
					</p>
				</div>
				<Separator className="my-4" />
				<div className="flex h-5 items-center space-x-4 text-sm">
					<Link className="text-blue-500" href={`/dashboard/inbox/${transcription.id}`}>
						Ver
					</Link>
					<Separator orientation="vertical" />
					<Link className="text-blue-500" href={`/dashboard/inbox/${transcription.id}/edit`}>
						Editar
					</Link>
					<Separator orientation="vertical" />
					<Link className="text-blue-500" href={`/dashboard/inbox/${transcription.id}/summary`}>
						Resumir
					</Link>
				</div>
			</div>
			{children}
		</>


	);
}
