import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { LoginFormSchemaTypes } from "@/types/zod.types";
import { toastAxiosError } from "@/lib/axios/toastAxiosError";

async function loginUser(data: LoginFormSchemaTypes) {
    const { email, password } = data;
    const newEmail = email.toLowerCase();

    return await axios.post(
        `/api/auth/login/`,
        {
            email: newEmail,
            password: password,
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

export function useLoginUser() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: () => {
            toast.success("Login successful");
            router.push("/subspaces");
        },
        onError: (error) => {
            console.log(error);
            toastAxiosError(error);
        },
    });

    return mutation;
}
