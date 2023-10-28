import { apiUrl } from "@/env";
import { Chat } from "@/payload-types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type ChatBody = {
    name: string;
    description: string;
    type?: Chat['type'];
}

const postChat = async (data: ChatBody) => {
    const res = await axios.post(
        `${apiUrl}/api/chats`,
        data,
        {
            withCredentials: true,
        }
    );

    return res.data;
};
export default function useMutationCreateChat() {
    return useMutation(postChat)
}