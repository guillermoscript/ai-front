import { apiUrl } from "@/env";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useMutationUpdateMessage() {
    return useMutation({
        mutationFn: async (data: any) => {
            const res = await axios.patch(
                `${apiUrl}/api/messages/${data.id}`,
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