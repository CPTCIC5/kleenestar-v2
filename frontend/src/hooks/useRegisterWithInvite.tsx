import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { InvitedRegisterFormSchemaTypes } from "@/lib/types/types";
import toastAxiosError from "@/lib/services/toastAxiosError";

export function useRegisterWithInvite() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async (data: InvitedRegisterFormSchemaTypes) => {
            const newEmail = data.email.toLowerCase();

            return await axios.post(
                `/api/auth/signup/`,
                {
                    email: newEmail,
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
        onSuccess: (data) => {
            if (data?.statusText === "IM Used") {
                toast.error("Invite Code is already used!");
                return;
            }
            toast.success("Registration Successful!");
            router.push("/chat");
        },
        onError: (error) => {
            toastAxiosError(error);
        },
    });

    return mutation;
}
