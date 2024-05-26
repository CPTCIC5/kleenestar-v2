import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { SettingsSecurityFormSchemaTypes } from "@/lib/types/types";
import Cookies from "js-cookie";

export function useChangePassword() {
    const mutation = useMutation({
        mutationFn: async (data: SettingsSecurityFormSchemaTypes) => {
            return await axios.post(
                `/api/auth/change-password/`,
                {
                    current_password: data.current_password,
                    new_password: data.new_password,
                    confirm_new_password: data.confirm_new_password,
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
        onSuccess: (response) => {
            toast.success(response.data.message);
        },
        onError: (error) => {
            const err = error as AxiosError<{ error: string }>;
            const message = err?.response?.data?.error;
            if (message) {
                toast.error(message);
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        },
    });

    return mutation;
}
