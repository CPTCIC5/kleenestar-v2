import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { InvitedSignupFormSchemaTypes } from "@/types/zod.types";
import { toastAxiosError } from "@/lib/axios/toastAxiosError";

async function signupUserWithInvite(data: InvitedSignupFormSchemaTypes) {
    const { email, password, confirmPassword, newsletter, inviteCode } = data;
    const newEmail = email.toLowerCase();

    const response = await axios.post(
        `/api/auth/signup/`,
        {
            email: newEmail,
            password: password,
            confirm_password: confirmPassword,
            newsletter: newsletter,
            invite_code: inviteCode,
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

    if (response.statusText === "IM Used") {
        throw new Error("Invite Code is already used!");
    }

    return response.data;
}

export function useSignupUserWithInvite() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: signupUserWithInvite,
        onSuccess: () => {
            toast.success("Signup successful");
            router.push("/subspaces");
        },
        onError: (error) => {
            console.log(error);
            toastAxiosError(error);
        },
    });

    return mutation;
}
