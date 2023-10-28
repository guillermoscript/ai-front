import { apiUrl } from "@/env";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useMutationCreateCheckoutSession() {
	return useMutation({
		mutationFn: async (data: {
			productId: string;
			url: string;
		}) => {
			const response = await axios.post(
				`${apiUrl}/api/${data.url}`,
				{
					productId: data.productId,
				},
				{
					withCredentials: true,
				}
			);
			return response.data;
		},
	});
}
