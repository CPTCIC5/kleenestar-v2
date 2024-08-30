import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toastAxiosError } from "@/lib/axios/toastAxiosError";

async function deleteConvo(convoId: number) {
    await axios.delete(`/api/channels/convos/${convoId}/`, {
        withCredentials: true,
        headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
        },
    });
}

export function useDeleteConvo() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const subspaceId = Cookies.get("subspaceId");

    return useMutation({
        mutationFn: deleteConvo,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["convos", subspaceId] });
            router.push(`/dashboard/chat/`);
        },
        onError: (error) => {
            console.log(error);
            toastAxiosError(error);
        },
    });
}
