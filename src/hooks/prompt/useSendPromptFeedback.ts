import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import Cookies from "js-cookie";
import { toastAxiosError } from "@/lib/axios/toastAxiosError";

interface SendPromptFeedbackProps {
    promptId: number;
    promptFeedbackOption: number;
    promptFeedbackMessage: string;
}

async function sendPromptFeedback({
    promptId,
    promptFeedbackOption,
    promptFeedbackMessage,
}: SendPromptFeedbackProps) {
    await axios.post(
        `/api/channels/prompts/${promptId}/feedback/`,
        {
            category: promptFeedbackOption,
            note: promptFeedbackMessage,
        },
        {
            withCredentials: true,
            headers: {
                "ngrok-skip-browser-warning": "69420",
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken"),
            },
        },
    );
}

export function useSendPromptFeedback() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: sendPromptFeedback,
        onSuccess: () => {
            toast.success("feedback submitted successfully");
        },
        onError: (error) => {
            console.error(error);
            toastAxiosError(error);
        },
    });

    return mutation;
}
