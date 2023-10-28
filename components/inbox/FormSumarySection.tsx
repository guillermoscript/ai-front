import { Slider } from "@/components/ui/slider";
import { UserTranscription } from "@/payload-types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import useMutationSummary from "./hooks/useMutationSummary";
import useRefreshServerProps from "@/hooks/useRefreshServerProps";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useState } from "react";
import { SliderProps } from "@radix-ui/react-slider";
import { AxiosError } from "axios";

const schema = yup.object().shape({
	options: yup.array().of(yup.string()).min(1).required(),
	// array of numbers:
	// slider: yup.array().of(yup.number()).min(1).max(16000).required(),
});

type FormValues = yup.InferType<typeof schema>;

type FormSummarySectionProps = {
	transcription: UserTranscription;
};

export default function FormSummarySection({
	transcription,
}: FormSummarySectionProps) {

	const [maxLength, setMaxLength] = useState<number[]>([256]);
	const mutation = useMutationSummary();
	const { refreshData } = useRefreshServerProps();
	const methods = useForm<FormValues>({
		resolver: yupResolver(schema),
		mode: "all",
	});
	const {
		handleSubmit,
		register,
		// setValue,
		formState: { errors, isSubmitting, isValid, 
			// dirtyFields
		}, 
	} = methods;

	function onSubmit(values: FormValues) {
		console.log(values);
		console.log(maxLength[0], "maxLength[0]")

		mutation.mutate(
			{
				options: values.options,
				transcriptionId: transcription.id,
				max_tokens: maxLength[0],
			},
			{
				onSuccess: () => {
					refreshData();
				},
				onError(error, variables, context) {
					const axiosError = error as AxiosError
					console.log(axiosError.response?.data, "axiosError.response?.data");

				},
			}
		);
	}
	
	return (
		<FormProvider {...methods}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-4"
			>
				<h2 className="text-lg font-semibold">
					Seleciona las opciones que deseas incluir en el resumen,
					puedes seleccionar más de una.
				</h2>

				<div className="flex flex-col gap-2">
					<label className="text-sm font-medium">
						<input
							type="checkbox"
							value="summary"
							className="mr-2 cursor-pointer"
							{...register("options")}
						/>
						Resumen: Resume la transcripción en un párrafo corto.
					</label>
				</div>
				<div className="flex flex-col gap-2">
					<label className="text-sm font-medium">
						<input
							type="checkbox"
							value="keyPoints"
							className="mr-2 cursor-pointer"
							{...register("options")}
						/>
						Puntos Clave: Enumera los puntos más importantes de la
						transcripción.
					</label>
				</div>
				<div className="flex flex-col gap-2">
					<label className="text-sm font-medium">
						<input
							type="checkbox"
							value="actionItems"
							className="mr-2 cursor-pointer"
							{...register("options")}
						/>
						Acciones: Enumera las acciones que se deben tomar a
						partir de la transcripción.
					</label>
				</div>
				<div className="flex flex-col gap-2">
					<label className="text-sm font-medium">
						<input
							type="checkbox"
							value="sentimentAnalysis"
							className="mr-2 cursor-pointer"
							{...register("options")}
						/>
						Análisis de Sentimiento: Analiza el tono y la actitud de
						la transcripción.
					</label>
				</div>

				<MaxLengthSelector maxValue={16384} value={maxLength} setValue={setMaxLength} />
				{/* <MaxLengthSelector value={dirtyFields.slider} setValue={setMaxLength} /> */}

				{errors.options && (
					<div className="text-status-danger">
						{errors.options.message}
					</div>
				)}
				<button
					type="submit"
					disabled={!isValid || mutation.isLoading}
					className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{mutation.isLoading ? "Loading..." : "Submit"}
				</button>
				{mutation.isLoading && (
					<p className="text-gray-500">Loading...</p>
				)}
				{mutation.isError && (
					<p className="text-status-danger">
						{((mutation.error as any)?.response)?.data.error.error.message}
					</p>
				)}
				{mutation.isSuccess && (
					<p className="text-green-500">
						Summary submitted successfully!
					</p>
				)}
			</form>
		</FormProvider>
	);
}

interface MaxLengthSelectorProps {
	value: number[]
	setValue: (value: number[]) => void
	maxValue: number
}

export function MaxLengthSelector({ value, setValue, maxValue }: MaxLengthSelectorProps) {
	

	return (
		<div className="grid gap-2 pt-2">
			<HoverCard openDelay={200}>
				<HoverCardTrigger asChild>
					<div className="grid gap-4">
						<div className="flex items-center justify-between">
							<label htmlFor="maxlength">Tamaño máximo</label>
							<span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
								{value}
							</span>
						</div>
						<Slider
							id="maxlength"
							max={maxValue}
							defaultValue={value}
							step={10}
							onValueChange={setValue}
							className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
							aria-label="Tamano maximo"
						/>
					</div>
				</HoverCardTrigger>
				<HoverCardContent
					align="start"
					className="w-[260px] text-sm"
					side="left"
				>
					El número máximo de tokens a generar. Las solicitudes pueden utilizar
					utilizar hasta 2.048 o 16.000 tokens. El máximo de tokens es el límite de la cantidad de palabras o caracteres que puedes ingresar en la APP para realizar una solicitud.
					Cada palabra, número, signo de puntuación y carácter especial, como los espacios en blanco, cuentan como tokens.
					Si tienes errores trata de ajustar este valor.
				</HoverCardContent>
			</HoverCard>
		</div>
	);
}
