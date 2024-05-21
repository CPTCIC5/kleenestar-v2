import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import axiosInstance from "@/lib/axios/AxiosInstance";
import { SettingsSecurityFormSchemaTypes } from "@/lib/types/types";

export function useChangePassword() {
    const mutation = useMutation({
        mutationFn: async (data: SettingsSecurityFormSchemaTypes) => {
            return await axiosInstance.post(`/api/auth/change-password/`, {
                current_password: data.current_password,
                new_password: data.new_password,
                confirm_new_password: data.confirm_new_password,
            });
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
