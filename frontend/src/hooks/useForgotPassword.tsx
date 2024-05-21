import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ForgotPasswordFormSchemaTypes } from "@/lib/types/types";
import axiosInstance from "@/lib/axios/AxiosInstance";
import { AxiosError } from "axios";

export function useForgotPassword() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async (data: ForgotPasswordFormSchemaTypes) => {
            return await axiosInstance.post(`/api/auth/password_reset/`, {
                email: data.email,
            });
        },
        onSuccess: () => {
            toast.success("Email sent with reset link!");
            router.push("/login");
        },
        onError: (error) => {
            const err = error as AxiosError<{ email?: string[] }>;
            if (err.response?.data?.email) {
                toast.warning("This email is not registered with us. Please try again.");
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        },
    });

    return mutation;
}
