import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import Cookies from "js-cookie";

export function useEditUserProfile(userId: number) {
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const reponse = await axios.patch(`/api/auth/users/${userId}/`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                    "X-CSRFToken": Cookies.get("csrftoken"),
                },
            });
            console.log(
                "formData in api",
                formData.get("avatar"),
                formData.get("first_name"),
                formData.get("last_name"),
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userData"] });
            toast.success("Name updated successfully");
        },
        onError: (error) => {
            toast.error("An unexpected error occurred. Please try again.");
        },
    });

    return mutation;
}
