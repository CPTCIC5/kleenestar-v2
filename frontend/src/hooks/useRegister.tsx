import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { RegisterFormSchemaTypes } from "@/lib/types/types";
import toastAxiosError from "@/lib/services/toastAxiosError";

// Separate API call function
const registerUser = async (data: RegisterFormSchemaTypes) => {
    const newEmail = data.email.toLowerCase();
    return await axios.post(
        "/api/auth/signup/",
        {
            email: newEmail,
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
};

export function useRegister() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            toast.success("Registration Successful!");
            router.push("/new-workspace");
        },
        onError: (error) => {
            toastAxiosError(error);
        },
    });

    return mutation;
}
