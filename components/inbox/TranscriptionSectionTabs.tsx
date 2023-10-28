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
};

export default function TranscriptionSectionTabs({
	transcription,
	
}: TranscriptionSectionProps) {
	
	console.log(transcription.transcriptionText, "transcription.transcriptionText")

	return (
		<Tabs defaultValue="view" className="w-full gap-3">
			<TabsList>
				<TabsTrigger value="view">Ver</TabsTrigger>
				<TabsTrigger value="edit">Editar Transcripción</TabsTrigger>
				<TabsTrigger value="summary">Resumir</TabsTrigger>
				<TabsTrigger value="qa">Q&A</TabsTrigger>
				<TabsTrigger value="delete">Eliminar</TabsTrigger>
			</TabsList>
			<TabsContent value="view">
				<div className="flex flex-col py-5 ">
					<ViewMarkdown value={transcription.transcriptionText!} />
				</div>
			</TabsContent>
			<TabsContent value="edit">
				<TranscriptionSectionEdit
					transcriptionId={transcription.id}
					transcription={transcription.transcriptionText!}
				/>
			</TabsContent>
			<TabsContent value="summary">
				<SummarySection transcription={transcription} />
			</TabsContent>
			<TabsContent value="qa">
				<SummarySection transcription={transcription} />
			</TabsContent>
			<TabsContent value="delete">
				<DeleteAudioForm transcription={transcription} />
			</TabsContent>
		</Tabs>
	);
}
