import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { UserTranscription } from "@/payload-types";
import Link from "next/link";
import { useState } from "react";
import useMutationDeleteAudio from "./hooks/useMuatationDeleteAudio";
import { useRouter } from "next/router";

type DeleteAudioFormProps = {
	transcription: UserTranscription;
};

export default function DeleteAudioForm({
	transcription,
}: DeleteAudioFormProps) {
	const [open, setOpen] = useState<boolean>(false);
	const mutation = useMutationDeleteAudio();
	const { push } = useRouter();

	return (
		<div className="flex flex-col gap-3">
			<h3 className="text-xl font-bold">Eliminar Audio</h3>
			<div className="flex gap-3">
				<button
					onClick={() => setOpen(true)}
					className="btn btn-warning"
				>
					Eliminar
				</button>

				<Link href="/dashboard/inbox" className="btn btn-primary">
					Cancelar
				</Link>
			</div>

			{open && (
				<AlertDialog open={open} onOpenChange={setOpen}>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								¿Estás seguro de eliminar este audio?
							</AlertDialogTitle>
							<AlertDialogDescription>
								Esta acción no se puede deshacer.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancelar</AlertDialogCancel>
							<AlertDialogAction
								disabled={mutation.isLoading}
								onClick={() => {
									console.log("delete");
									mutation.mutate(
										{
											transcriptionId: transcription.id,
											audioId:
												typeof transcription.audio ===
												"string"
													? transcription.audio
													: (transcription.audio
															?.id as string),
										},
										{
											onSuccess: (data) => {
												console.log(data);
												push("/dashboard/inbox");
											},
										}
									);
								}}
							>
								{mutation.isError && (
									<span className="text-red-500">
										Error al eliminar
									</span>
								)}
								{mutation.isSuccess && (
									<span className="text-green-500">
										Eliminado correctamente
									</span>
								)}

								{!mutation.isLoading &&
									!mutation.isError &&
									!mutation.isSuccess && (
										<span>Eliminar</span>
									)}
							</AlertDialogAction>
							{mutation.isLoading && (
								<span className="loading loading-bars loading-lg"></span>
							)}
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			)}
		</div>
	);
}
