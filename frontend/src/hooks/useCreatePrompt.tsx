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
    file: File | null;
}) => {
    await axios.post(
        `/api/channels/convos/${convoId}/prompts/create/`,
        { text_query: text, file_query: file },
        {
            withCredentials: true,
            headers: {
                "ngrok-skip-browser-warning": "69420",
                "Content-Type": "multipart/form-data",
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
            console.log("prompts", variables.convoId);
            queryClient.invalidateQueries({ queryKey: ["prompts", variables.convoId] });
        },
    });
};
