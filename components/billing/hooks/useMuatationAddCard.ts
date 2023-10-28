import { apiUrl } from "@/env";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useMuatationAddCard() {
	return useMutation({
		mutationFn: async (data: any) => {
			const response = await axios.post(
				`${apiUrl}/api/charge-session-checkout`,
				data,
				{
					withCredentials: true,
				}
			);
			return response.data;
		},
	});
}
