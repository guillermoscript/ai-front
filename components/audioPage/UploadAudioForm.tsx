import { Progress } from "@/components/ui/progress"
import useRefreshServerProps from "@/hooks/useRefreshServerProps";
import { useState } from "react";
import useMutationUploadAudio from "../chat/hooks/useMutationUploadAudio";
import { Button } from "../ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "../ui/card";
import { useRouter } from "next/router";

export default function UploadAudioForm() {
	const [progress, setProgress] = useState<number>(0);
	const mutation = useMutationUploadAudio({
		progress: setProgress,
	});
    const { push } = useRouter();
	const [file, setFile] = useState<File | null>(null);
	const [error, setError] = useState<string | null>(null);
	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!file) {
			setError("No audio file selected");
			return;
		}

		mutation.mutate(file, {
			onSuccess(data, variables, context) {
				console.log(data);
				push(`/dashboard/inbox/${data.doc.id}`);
			},
			onError(error, variables, context) {
				console.log(error);
				console.log((error as any)?.message)
			},
		});
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-2xl font-bold">
					Subir audio
				</CardTitle>
				<CardDescription>
					Sube un audio y haremos nuestra magia, si el archivo es de mas de 25 MB, por favor subelo en formato mp3 y sea paciente mientras se sube.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-2">
				<form
					onSubmit={onSubmit}
					className="flex flex-col justify-center gap-3"
				>
					<input
						type="file"
						className="file-input file-input-bordered w-full"
						// accet one of these formats: flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, or webm.
						accept="audio/mp3 audio/wav audio/ogg audio/webm audio/mpeg audio/m4a audio/mpga audio/mp4 audio/flac"
						name="file"
						required
						onChange={(e) => {
							if (e.target.files) {
								setFile(e.target.files[0]);
							}
						}}
					/>

					{error && <div className=" text-error">{error}</div>}
					{mutation.isLoading && (
						<div className="text-gray-500">Subiendo...</div>
					)}
					{mutation.isError && (
						<div className="text-error">
							Error al subir el audio
							{(mutation.error as any)?.code === "ERR_BAD_REQUEST" && (
								<p>
									El archivo no es un audio permitido, por favor sube un audio en uno de estos formatos: flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, or webm.
								</p>
							)}
						</div>
					)}
					{mutation.isSuccess && (
						<div className="text-green-500">
							Audio subido correctamente
						</div>
					)}
					<Button
						className="btn btn-primary w-20  rounded"
						disabled={mutation.isLoading}
						type="submit"
					>
						Enviar
					</Button>
                    {
                        progress > 0 && (
                            <Progress value={progress} />
                        )
                    }
				</form>
			</CardContent>
		</Card>
	);
}
