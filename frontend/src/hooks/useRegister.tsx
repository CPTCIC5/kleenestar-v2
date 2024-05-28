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
        onError: (error: AxiosError<{ data?: Record<string, string[]> }>) => {
            const err = error as AxiosError<{ data?: Record<string, string[]> }>;

            console.log(error);

            if (err.response?.data) {
                const errorMessages = err.response.data;

                // Iterate over the error messages and show a toast for each one
                for (const [field, messages] of Object.entries(errorMessages)) {
                    (messages as unknown as string[]).forEach((message: string) =>
                        toast.error(message),
                    );
                }
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        },
    });

    return mutation;
}
