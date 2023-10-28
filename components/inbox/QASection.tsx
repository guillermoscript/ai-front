import { apiUrl } from "@/env";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as yup from "yup";
import Form from "../ui/form/Form";
import Input from "../ui/form/Input";
import { UserTranscription } from "@/payload-types";

async function getChats() {
    const chats = await axios.get(`${apiUrl}/api/chats?where[type][equals]=qa`, {
        withCredentials: true,
    });
    return chats.data;
}

type QAChat = {
    transcription: UserTranscription;
}

export default function QASesction({ transcription }: QAChat) {
	const chats = useQuery(["qa-chats"], getChats);

	if (chats.isLoading) {
		return <p>Loading...</p>;
	}

	if (chats.isError) {
		return <p>Error</p>;
	}

	return (
		<div className="flex flex-col">
			<h3 className="text-lg font-semibold mb-2">
				Chats de Preguntas y Respuestas
			</h3>
			{chats.data.length === 0 ? (
				<>
					<p>No hay chats de preguntas y respuestas</p>
					<CreateQAChatForm 
                        transcription={transcription}
                    />
				</>
			) : (
				<ul className="flex flex-col gap-2">
					{chats.data.map((chat: any) => (
						<li key={chat.id}>
							<p>{chat.title}</p>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}


const schema = yup.object().shape({
    name: yup.string().required("El nombre de la carpeta es requerido"),
    description: yup.string().required("La descripcion de la carpeta es requerida"),
});

type FormValues = yup.InferType<typeof schema>;

const clasesss = {
    label: 'block text-sm font-medium',
    input: 'input w-full input-bordered',
    error: 'pt-2 text-status-danger',
    container: 'form-control w-full p-3',
};

type CreateQAChatFormProps = {
    transcription: UserTranscription;
}

function CreateQAChatForm({ transcription }: CreateQAChatFormProps) {
	const mutation = useMutation({
		mutationFn: async (data: any) => {
			const res = await axios.post(`${apiUrl}/api/chats`, data, {
				withCredentials: true,
			});
			return res.data;
		},
		onSuccess: () => {
			// queryClient.invalidateQueries('qa-chats');
		},
	});

	function onSubmit(values: FormValues) {
		mutation.mutate({
            ...values,
			name: "QA Chat" + transcription.id,
			type: "qa",
		});
	}

	return (
		<Form onSubmit={onSubmit} schema={schema} className="w-full">
			<Input
				name="name"
				displayName="Nombre de la carpeta"
				placeholder="Clases de programacion"
				clasess={clasesss}
			/>
			<Input
				name="description"
				displayName="Descripcion de la carpeta"
				placeholder="Clases de programacion"
				clasess={clasesss}
			/>
			<button
				type="submit"
				disabled={mutation.isLoading}
				className="btn btn-primary"
			>
				Crear
			</button>

			{mutation.isError && (
				<div className="text-error">
					<p className="mb-2">Error al crear la carpeta</p>
				</div>
			)}

			{mutation.isSuccess && (
				<div className="text-success">
					<p className="mb-2">Carpeta creada</p>
				</div>
			)}

			{mutation.isLoading && (
				<div className="text-primary">
					<p className="mb-2">Creando carpeta...</p>
				</div>
			)}
		</Form>
	);
}