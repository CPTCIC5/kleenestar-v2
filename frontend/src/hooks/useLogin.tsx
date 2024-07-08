import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { LoginFormSchemaTypes } from "@/lib/types/types";
import Cookies from "js-cookie";
import toastAxiosError from "@/lib/services/toastAxiosError";

// Separate API call function
const loginUser = async (data: LoginFormSchemaTypes) => {
    const newEmail = data.email.toLowerCase();

    return await axios.post(
        `/api/auth/login/`,
        {
            email: newEmail,
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
};

export function useLogin() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            console.log(data);
            toast.success("Login successful!!");
            router.push("/select-subspace");
        },
        onError: (error) => {
            toastAxiosError(error);
        },
    });

    return mutation;
}
