import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "sonner";
import { toastAxiosError } from "@/lib/axios/toastAxiosError";

async function logoutUser() {
    return await axios.post(`/api/auth/logout/`, null, {
        withCredentials: true,
        headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
        },
    });
}

export function useLogoutUser() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            toast.success("logout successful");
            router.push("/");
        },
        onError: (error) => {
            toastAxiosError(error);
        },
    });

    return mutation;
}
