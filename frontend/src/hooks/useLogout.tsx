import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "sonner";
import toastAxiosError from "@/lib/services/toastAxiosError";

export function useLogout() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async () => {
            return await axios.post(`/api/auth/logout/`, null, {
                withCredentials: true,
                headers: {
                    "ngrok-skip-browser-warning": "69420",
                    "Content-Type": "application/json",
                    "X-CSRFToken": Cookies.get("csrftoken"),
                },
            });
        },
        onSuccess: () => {
            toast.success("Logout successfully !!");
            router.push("/");
        },
        onError: (error) => {
            toastAxiosError(error);
        },
    });

    return mutation;
}
