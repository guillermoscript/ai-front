import { apiUrl } from "@/env";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useMutationDeleteAudio() {

    return useMutation({
        mutationFn: async ({
            audioId,
            transcriptionId,
        }: {
            audioId: string;
            transcriptionId: string;
        }) => {
            const res = await axios.delete(
                `${apiUrl}/api/user-transcriptions/${transcriptionId}/audios/${audioId}`,
                {
                    withCredentials: true,
                }
            );

            return res.data;
        },
    });
}
