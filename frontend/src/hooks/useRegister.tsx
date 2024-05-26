import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { RegisterFormSchemaTypes } from "@/lib/types/types";
import Cookies from "js-cookie";

export function useRegister() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async (data: RegisterFormSchemaTypes) => {
            return await axios.post(
                `/api/auth/signup/`,
                {
                    email: data.email,
                    password: data.password,
                    confirm_password: data.confirmPassword,
                    newsletter: data.newsletter,
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
            toast.success("Registration Successful!");
            router.push("/create-workspace");
        },
        onError: (error) => {
            const err = error as AxiosError<{ email?: string[] }>;
            if (err.response?.data?.email) {
                toast.error(err.response.data.email[0]);
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        },
    });

    return mutation;
}
