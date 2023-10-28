import Form from "../ui/form/Form";
import * as yup from "yup";
import Input from "../ui/form/Input";
import PasswordComponent from "../ui/form/PasswordComponent";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { User } from "@/payload-types";

const profileSchema = yup.object().shape({
	firstName: yup.string().required(),
	lastName: yup.string().required(),
	address: yup.string().required(),
	phone: yup.string().required(),
	birthday: yup.string().required(),
	// gender: yup.string().required(),
	password: yup.string().min(6).required(),
	password_confirmation: yup.string().min(6).required(),
});

type profileSchemaType = yup.InferType<typeof profileSchema>;

const classNames = {
	label: "text-xs font-medium text-neutral-600",
	input: "input input-bordered w-full",
	error: "pt-2 text-red-400",
	container: "mb-4",
};

export default function AccountForm({ user }: { user: User }) {
	const mutation = useMutation({
		mutationFn: async (data: profileSchemaType) => {
			const response = await axios.put("/api/users", data);
			return response.data;
		},
		onSuccess: () => {
			console.log("success");
		},
	});

	function onSubmit(data: profileSchemaType) {
		console.log(data);
		mutation.mutate(data);
	}

	return (
		<Form
		defaultValues={{
			firstName: user.firstName,
			lastName: user.lastName,
			address: user.address || "",
			phone: user.phone || "",
			birthday: user.birthDate || "",
			password: "",
			password_confirmation: "",
		}}
			onSubmit={onSubmit}
			schema={profileSchema}
			className="flex flex-col gap-3"
		>
			<Input
				displayName="Nombre"
				name="firstName"
				type="text"
				placeholder="Nombre"
				clasess={classNames}
			/>

			<Input
				displayName="Apellido"
				name="lastName"
				type="text"
				placeholder="Apellido"
				clasess={classNames}
			/>

			<Input
				displayName="Dirección"
				name="address"
				type="text"
				placeholder="Dirección"
				clasess={classNames}
			/>

			<Input
				displayName="Teléfono"
				name="phone"
				type="text"
				placeholder="Teléfono"
				clasess={classNames}
			/>

			<Input
				displayName="Fecha de nacimiento"
				name="birthday"
				type="date"
				placeholder="Fecha de nacimiento"
				clasess={classNames}
			/>

			<Input
				displayName="Constraseña"
				name="password"
				type="password"
				placeholder="Constraseña"
				clasess={classNames}
			/>

			<Input
				displayName="Confirmar contraseña"
				name="password_confirmation"
				type="password"
				placeholder="Confirmar contraseña"
				clasess={classNames}
			/>

			<button
				disabled={mutation.isLoading}
				type="submit"
				className="btn btn-primary w-full mt-4"
			>
				{mutation.isLoading ? "Procesando" : "Guardar"}
			</button>

			{mutation.isError && (
				<div className="text-red-400">
					Algo salió mal, por favor intente de nuevo
				</div>
			)}

			{mutation.isSuccess && (
				<div className="text-green-400">¡Datos actualizados!</div>
			)}
		</Form>
	);
}
