import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { InvitedRegisterFormSchemaTypes } from "@/lib/types/types";
import Cookies from "js-cookie";
import toastAxiosError from "@/lib/services/toastAxiosError";

export function useRegisterWithInvite() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async (data: InvitedRegisterFormSchemaTypes) => {
            return await axios.post(
                `/api/auth/signup/`,
                {
                    email: data.email,
                    password: data.password,
                    confirm_password: data.confirmPassword,
                    newsletter: data.newsletter,
                    invite_code: data.inviteCode,
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
            router.push("/chat");
        },
        onError: (error) => {
            toastAxiosError(error);
        },
    });

    return mutation;
}
