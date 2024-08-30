import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { toastAxiosError } from "@/lib/axios/toastAxiosError";

async function sendFeedback(feedbackFormData: FormData) {
    return await axios.post(`/api/auth/add-feedback/`, feedbackFormData, {
        withCredentials: true,
        headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "multipart/form-data",
            "X-CSRFToken": Cookies.get("csrftoken"),
        },
    });
}

export function useSendFeedback() {
    const mutation = useMutation({
        mutationFn: sendFeedback,
        onSuccess: () => {
            toast.success("feedback sent successfully");
        },
        onError: (error) => {
            console.log(error);
            toastAxiosError(error);
        },
    });

    return mutation;
}
