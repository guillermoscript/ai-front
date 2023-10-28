import qs from 'qs'
import { apiUrl } from "@/env";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useMutationDeleteMessage() {
    return useMutation({
        mutationFn: async (data: {
            ids: string[],
        }) => {

            const query = {
                where: {
                    id: {
                        in: data.ids,
                    },
                },
            }

            const res = await axios.delete(
                `${apiUrl}/api/messages${qs.stringify(query, { addQueryPrefix: true })}`,
                {
                    withCredentials: true,
                    
                },
            );
    
            return res.data;
        },
        onSuccess(data, variables, context) {
            console.log(data);
        },
    });
    
} 