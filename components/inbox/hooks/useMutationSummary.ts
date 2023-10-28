import { apiUrl } from "@/env";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useMutationSummary() {
	return useMutation({
		mutationFn: async (data: any) => {
			const res = await axios.post(
				`${apiUrl}/api/transcription/summary`,
				{
					...data,
				},
				{
					withCredentials: true,
                    timeout: 1000 * 60 * 60 * 24 * 7
				}

			);

			return res.data;
		},
		onSuccess(data, variables, context) {
			console.log(data);
		},
	});
}
