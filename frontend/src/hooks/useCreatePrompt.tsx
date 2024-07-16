import axios from "axios";
import Cookies from "js-cookie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toastAxiosError from "@/lib/services/toastAxiosError";

// Define the type for the function arguments
interface CreatePromptArgs {
    convoId: number;
    text: string;
    file: File | null;
}

// Function to create a prompt
const createPrompt = async ({ convoId, text, file }: CreatePromptArgs) => {
    try {
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
    } catch (error) {
        console.error("Error creating prompt:", error);
        throw new Error("Failed to create prompt");
    }
};

// Custom hook to use the create prompt mutation
export const useCreatePrompt = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createPrompt,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["prompts", variables.convoId] });
        },
        onError: (error) => {
            toastAxiosError(error);
        },
    });
};
