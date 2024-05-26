import axios from "axios";
import Cookies from "js-cookie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const createPrompt = async ({
    convoId,
    text,
    file,
}: {
    convoId: number;
    text: string;
    file: string | null;
}) => {
    await axios.post(
        `/api/channels/convos/${convoId}/prompts/create/`,
        { text_query: text, file_query: file },
        {
            withCredentials: true,
            headers: {
                "ngrok-skip-browser-warning": "69420",
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken"),
            },
        },
    );
};

export const useCreatePrompt = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createPrompt,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["prompts", variables.convoId] });
        },
    });
};
