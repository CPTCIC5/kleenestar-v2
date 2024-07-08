import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ForgotPasswordFormSchemaTypes } from "@/lib/types/types";
import axios from "axios";
import Cookies from "js-cookie";
import toastAxiosError from "@/lib/services/toastAxiosError";

const ForgotPasswordUser = async (data: ForgotPasswordFormSchemaTypes) => {
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
};

export function useForgotPassword() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: ForgotPasswordUser,
        onSuccess: () => {
            toast.success("Email sent with reset link!");
            router.push("/login");
        },
        onError: (error) => {
            toastAxiosError(error);
        },
    });

    return mutation;
}
