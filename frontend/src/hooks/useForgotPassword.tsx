import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ForgotPasswordFormSchemaTypes } from "@/lib/types/types";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

export function useForgotPassword() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async (data: ForgotPasswordFormSchemaTypes) => {
            return await axios.post(
                `/api/auth/password_reset/`,
                {
                    email: data.email,
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
