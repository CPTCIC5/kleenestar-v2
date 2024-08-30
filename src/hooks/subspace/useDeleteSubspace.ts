import axios from "axios";
import Cookies from "js-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toastAxiosError } from "@/lib/axios/toastAxiosError";

async function deleteSubspace(subspaceId: number) {
    return await axios.delete(`/api/channels/subspaces/${subspaceId}/`, {
        withCredentials: true,
        headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
        },
    });
}

export function useDeleteSubspace() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteSubspace,
        onSuccess: (data, variable) => {
            queryClient.invalidateQueries({ queryKey: ["subspaces"] });
        },
        onError: (error) => {
            console.log(error);
            toastAxiosError(error);
        },
    });

    return mutation;
}
