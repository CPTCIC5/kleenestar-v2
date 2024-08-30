import axios from "axios";
import Cookies from "js-cookie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toastAxiosError } from "@/lib/axios/toastAxiosError";

interface CreatePromptProps {
    convoId: number;
    promptTextQuery: string;
    promptFileQuery: File | null;
}

async function createPrompt({ convoId, promptTextQuery, promptFileQuery }: CreatePromptProps) {
    return await axios.post(
        `/api/channels/convos/${convoId}/prompts/create/`,
        { text_query: promptTextQuery, file_query: promptFileQuery },
        {
            withCredentials: true,
            headers: {
                "ngrok-skip-browser-warning": "69420",
                "Content-Type": "multipart/form-data",
                "X-CSRFToken": Cookies.get("csrftoken"),
            },
        },
    );
}

export function useCreatePrompt() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createPrompt,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["prompts", variables.convoId] });
        },
        onError: (error) => {
            console.log(error);
            toastAxiosError(error);
        },
    });
}
