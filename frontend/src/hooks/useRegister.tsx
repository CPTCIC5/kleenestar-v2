import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { RegisterFormSchemaTypes } from "@/lib/types/types";

export function useRegister() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async (data: RegisterFormSchemaTypes) => {
            return axios.post(
                `/api/auth/signup/`,
                {
                    email: data.email,
                    password: data.password,
                    confirm_password: data.confirmPassword,
                    newsletter: data.newsletter,
                },
                {
                    headers: {
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
