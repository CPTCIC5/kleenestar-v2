import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { LoginFormSchemaTypes } from "@/lib/types/types";
import Cookies from "js-cookie";
import toastAxiosError from "@/lib/services/toastAxiosError";

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
            toastAxiosError(error);
        },
    });

    return mutation;
}
