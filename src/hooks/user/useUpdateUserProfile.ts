import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";
import Cookies from "js-cookie";
import { toastAxiosError } from "@/lib/axios/toastAxiosError";

interface UpdateUserProfileProps {
    userId: number;
    data: FormData;
}

async function updateUserProfile({ userId, data }: UpdateUserProfileProps) {
    return await axios.patch(`/api/auth/users/${userId}/`, data, {
        withCredentials: true,
        headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "multipart/form-data",
            "X-CSRFToken": Cookies.get("csrftoken"),
        },
    });
}

export function useUpdateUserProfile() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateUserProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
            queryClient.invalidateQueries({ queryKey: ["workspace"] });
            toast.success("Profile updated successfully");
        },
        onError: (error) => {
            console.log(error);
            toastAxiosError(error);
        },
    });

    return mutation;
}
