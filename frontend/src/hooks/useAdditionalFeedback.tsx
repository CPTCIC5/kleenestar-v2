import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import Cookies from "js-cookie";

type AdditionalFeedbackType = {
    option: number;
    message: string;
};

export function useAdditionalFeedback() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async ({ id, data }: { id: number; data: AdditionalFeedbackType }) => {
            return await axios.post(
                `/api/channels/prompts/${id}/feedback/`,
                {
                    category: data.option,
                    note: data.message,
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
        },
        onSuccess: () => {
            toast.success("Feedback submitted successfully!");
        },
        onError: (error) => {
            toast.error("An unexpected error occurred. Please try again.");
        },
    });

    return mutation;
}
