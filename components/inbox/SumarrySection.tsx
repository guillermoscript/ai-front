import useRefreshServerProps from "@/hooks/useRefreshServerProps";
import useMutationSummary from "./hooks/useMutationSummary";
import { UserTranscription } from "@/payload-types";
import Form from "../ui/form/Form";
import Editor from "@/components/ui/makrdown/Editor";
import * as yup from "yup";
import Input from "../ui/form/Input";
import FormSummarySection from "./FormSumarySection";
import { useState } from "react";

import useMutationPutTranscription from "./hooks/useMutationPutTranscription";

type SummarySectionProps = {
	transcription: UserTranscription;
};

const summarySchema = yup.object().shape({
	// prompt: yup.string().required().min(20).max(1000),
});

type summarySchemaType = yup.InferType<typeof summarySchema>;

export default function SummarySection({ transcription }: SummarySectionProps) {
	
	return (
		<>
			{transcription.summary ? (
				<div className="flex flex-col py-5 ">
					<EditSummary transcription={transcription} />
				</div>
			) : (
				<div className="flex items-center justify-center py-5 max-w-2xl mx-auto">
					<FormSummarySection transcription={transcription} />
				</div>
			)}
		</>
	);
}

function EditSummary({ transcription }: SummarySectionProps) {
	const [value, setValue] = useState<string>(transcription.summary!);
	const mutation = useMutationPutTranscription();
	const { refreshData } = useRefreshServerProps();

	function onSubmit(e: any) {
		e.preventDefault();

		if (!value) return;

		const data = {
			summary: value,
		}
		mutation.mutate(
			{
				data,
				transcriptionId: transcription.id,
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
				<Editor value={value} setValue={setValue} />
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