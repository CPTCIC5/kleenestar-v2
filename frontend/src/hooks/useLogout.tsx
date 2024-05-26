import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "sonner";

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
            Cookies.remove("csrftoken");
            Cookies.remove("sessionid");
            toast.success("Logout successfully !!");
            setTimeout(() => {
                router.push("/");
            }, 100);
        },
        onError: (error) => {
            toast.error("Logout Failed");
        },
    });

    return mutation;
}
