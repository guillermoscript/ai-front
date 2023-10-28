import { apiUrl } from "@/env";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useMutationMessage() {
    return useMutation({
        mutationFn: async (data: any) => {
            const res = await axios.post(
                `${apiUrl}/api/messages`,
                {
                    ...data,
                },
                {
                    withCredentials: true,
                }
            );
    
            return res.data;
        },
        onSuccess(data, variables, context) {
            console.log(data);
        },
    });
    
} 