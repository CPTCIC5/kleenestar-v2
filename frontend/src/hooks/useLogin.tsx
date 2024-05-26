import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { LoginFormSchemaTypes } from "@/lib/types/types";
import Cookies from "js-cookie";

export function useLogin() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async (data: LoginFormSchemaTypes) => {
            return await axios.post(
                `/api/auth/login/`,
                {
                    email: data.email,
                    password: data.password,
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
            toast.success("Login Successfull!");
            router.push("/chat");
        },
        onError: (error) => {
            const err = error as AxiosError<{ detail: string }>;
            if (err.response?.data) {
                toast.error(err.response.data.detail);
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        },
    });

    return mutation;
}
