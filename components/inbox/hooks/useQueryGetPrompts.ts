import { apiUrl } from "@/env";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type useQueryGetPromptsProps = {
    categotyName?: string;
};

export default function useQueryGetPrompts({ categotyName }: useQueryGetPromptsProps) {
    return useQuery({
        queryKey: ['getPrompts'],
        queryFn: async () => {
            const res = await axios.get(`${apiUrl}/api/prompts`, {
                withCredentials: true,
                params: {
                    category: categotyName
                }
            });
            return res.data;
        },
    });
}