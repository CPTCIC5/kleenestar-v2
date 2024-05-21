import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios/AxiosInstance";
import Cookies from "js-cookie";

export function useLogout() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async () => {
            return await await axiosInstance.post(`/api/auth/logout/`, null);
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
