import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { InvitedRegisterFormSchemaTypes } from "@/lib/types/types";
import Cookies from "js-cookie";

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
