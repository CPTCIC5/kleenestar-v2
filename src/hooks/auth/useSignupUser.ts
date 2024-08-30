import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { SignupFormSchemaTypes } from "@/types/zod.types";
import { toastAxiosError } from "@/lib/axios/toastAxiosError";

async function signupUser(data: SignupFormSchemaTypes) {
    const { email, password, confirmPassword, newsletter } = data;
    const newEmail = email.toLowerCase();

    return await axios.post(
        "/api/auth/signup/",
        {
            email: newEmail,
            password: password,
            confirm_password: confirmPassword,
            newsletter: newsletter,
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
}

export function useSignupUser() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: signupUser,
        onSuccess: () => {
            toast.success("Signup successful");
            router.push("/create-workspace");
        },
        onError: (error) => {
            console.log(error);
            toastAxiosError(error);
        },
    });

    return mutation;
}
