import Editor from "@/components/ui/makrdown/Editor";
import useRefreshServerProps from "@/hooks/useRefreshServerProps";
import { useState } from "react";
import useMutationPutTranscription from "./hooks/useMutationPutTranscription";
import MarkdownEditor from "../ui/MarkdownEditor";

type TranscriptionSectionEditProps = {
    transcriptionId: string;
    transcription: string;
};

export default function TranscriptionSectionEdit({
    transcription,
	transcriptionId,
}: TranscriptionSectionEditProps) {
    const [value, setValue] = useState<string>(transcription);
	const mutation = useMutationPutTranscription();
	const { refreshData } = useRefreshServerProps();

	function onSubmit(e: any) {
		e.preventDefault();

		if (!value) return;

		const data = {
			transcriptionText: value,
		}
		mutation.mutate(
			{
				data,
				transcriptionId,
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
		<form onSubmit={onSubmit} className="flex flex-col py-5 ">
			<div className=" w-full py-3">
				{/* <Editor value={value} setValue={setValue} /> */}
				<MarkdownEditor markdown={value} setMarkdown={setValue} />
			</div>
			<button
				type="submit"
				disabled={mutation.isLoading}
				className="btn btn-primary"
			>
				Guardar
			</button>
			{mutation.isLoading && <p>Guardando...</p>}
			{mutation.isError && <p>Error al guardar</p>}
			{mutation.isSuccess && <p>Guardado</p>}
		</form>
	);
}