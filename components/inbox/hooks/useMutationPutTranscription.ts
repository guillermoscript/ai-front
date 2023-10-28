import { apiUrl } from "@/env";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useMutationPutTranscription() {
	return useMutation({
		mutationFn: async ({
			data,
			transcriptionId,
		}: {
			data: any;
			transcriptionId: string;
		}) => {
			const res = await axios.patch(
				`${apiUrl}/api/user-transcriptions/${transcriptionId}`,
				{
					...data,
				},
				{
					withCredentials: true,
				}
			);

			return res.data;
		},
	});
}
