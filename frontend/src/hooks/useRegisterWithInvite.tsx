import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { InvitedRegisterFormSchemaTypes } from "@/lib/types/types";
import toastAxiosError from "@/lib/services/toastAxiosError";

const registerWithInvite = async (data: InvitedRegisterFormSchemaTypes) => {
    const newEmail = data.email.toLowerCase();

    try {
        const response = await axios.post(
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
                    "Content-Type": "application/json",
                    "X-CSRFToken": Cookies.get("csrftoken"),
                },
            },
        );

        if (response.statusText === "IM Used") {
            throw new Error("Invite Code is already used!");
        }

        return response.data;
    } catch (error) {
        throw error;
    }
};

export function useRegisterWithInvite() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: registerWithInvite,
        onSuccess: (data) => {
            toast.success("Registration Successful!");
            router.push("/select-subspace");
        },
        onError: (error) => {
            toastAxiosError(error);
        },
    });

    return mutation;
}
