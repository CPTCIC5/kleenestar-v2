import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";
import Cookies from "js-cookie";
import { SettingsSecurityFormSchemaTypes } from "@/types/zod.types";
import { toastAxiosError } from "@/lib/axios/toastAxiosError";

async function updatePasswordOfUser(data: SettingsSecurityFormSchemaTypes) {
    const { currentPassword, newPassword, confirmNewPassword } = data;

    return await axios.post(
        `/api/auth/change-password/`,
        {
            current_password: currentPassword,
            new_password: newPassword,
            confirm_new_password: confirmNewPassword,
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

export function useUpdatePasswordOfUser() {
    const mutation = useMutation({
        mutationFn: updatePasswordOfUser,
        onSuccess: (response) => {
            toast.success(response.data.message);
        },
        onError: (error) => {
            console.error(error);
            toastAxiosError(error);
        },
    });

    return mutation;
}
