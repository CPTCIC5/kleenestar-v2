import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import toastAxiosError from "@/lib/services/toastAxiosError";

const sendFeedback = async (formData: FormData) => {
    return await axios.post(`/api/auth/add-feedback/`, formData, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
            "X-CSRFToken": Cookies.get("csrftoken"),
        },
    });
};

export function useSendFeedback() {
    const mutation = useMutation({
        mutationFn: sendFeedback,
        onSuccess: () => {
            toast.success("Feedback sent successfully!");
        },
        onError: (error) => {
            toastAxiosError(error);
        },
    });

    return mutation;
}
