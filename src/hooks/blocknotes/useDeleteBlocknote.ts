import { toastAxiosError } from "@/lib/axios/toastAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

async function deleteBlockNote(blocknoteId: number) {
    await axios.delete(`/api/channels/blocknotes/${blocknoteId}/`, {
        withCredentials: true,
        headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
        },
    });
}

export function useDeleteBlocknote() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const subspaceId = Cookies.get("subspaceId");

    if (!subspaceId) {
        router.push("/subspaces");
    }

    return useMutation({
        mutationFn: (id: number) => deleteBlockNote(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["blocknotes", subspaceId] });
        },
        onError: (error) => {
            console.log(error);
            toastAxiosError(error);
        },
    });
}
