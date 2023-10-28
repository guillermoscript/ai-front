import { useState } from "react";
import { Button } from "../ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "../ui/card";
import { AudioRecorder } from "react-audio-voice-recorder";
import useMutationUploadAudio from "../chat/hooks/useMutationUploadAudio";
import { Progress } from "../ui/progress";
import UploadAudioForm from "./UploadAudioForm";

export default function RecordAudioForm() {
	const [audio, setAudio] = useState<File | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [progress, setProgress] = useState<number>(0);
	// const mutation = useMutationUploadAudio({
	// 	progress: setProgress,
	// });

	const [show , setShow] = useState<boolean>(false)

	// function onSubmit() {
	// 	console.log("submit");
	// 	if (!audio) {
	// 		setError("No audio file selected");
	// 		return;
	// 	}
	// 	console.log(audio)
	// 	// make file a ogg file
	// }

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center justify-center">
					Grabar Audio
				</CardTitle>
				<CardDescription className="flex items-center justify-center">
					Graba un audio y haremos nuestra magia
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-2">
				<div className="flex flex-col items-center gap-3 justify-center">
					{/* <AudioRecorder
						onRecordingComplete={(blob) => {
							setAudio(blob);
							setShow(true)
						}}
						audioTrackConstraints={{
							noiseSuppression: true,
							echoCancellation: true,
						}}
						onNotAllowedOrFound={(err) => console.table(err)}
						downloadOnSavePress={true}
						downloadFileExtension="mp3"
						mediaRecorderOptions={{
							audioBitsPerSecond: 128000,
						}}
						showVisualizer={true}
					/> */}

					{error && <div className="text-red-500">{error}</div>}

					{progress > 0 && <Progress value={progress} />}

					{
						show && (
							<UploadAudioForm/>
						)
					}
				</div>
			</CardContent>
			<CardFooter className="flex justify-center">
				{/* <Button className=" btn btn-primary"
				//  onClick={onSubmit}
				 onClick={onSubmit2}
				 >
					Enviar
				</Button> */}
			</CardFooter>
		</Card>
	);
}
