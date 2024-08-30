import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import Cookies from "js-cookie";
import { ForgotPasswordFormSchemaTypes } from "@/types/zod.types";
import { toastAxiosError } from "@/lib/axios/toastAxiosError";

async function resetPasswordOfUser(data: ForgotPasswordFormSchemaTypes) {
    const { email } = data;

    return await axios.post(
        `/api/auth/password_reset/`,
        {
            email: email,
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

export function useResetPasswordOfUser() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: resetPasswordOfUser,
        onSuccess: () => {
            toast.success("Email sent with reset link !!");
            router.push("/login");
        },
        onError: (error) => {
            console.log(error);
            toastAxiosError(error);
        },
    });

    return mutation;
}
