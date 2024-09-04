import { toastAxiosError } from "@/lib/axios/toastAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

async function deleteKnowledgeSource(knowledgeSourceId: number) {
    await axios.delete(
        `/api/channels/knowledgebase/${knowledgeSourceId}/delete_knowledge_source/`,
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

export function useDeleteKnowledgeSource() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const subspaceId = Cookies.get("subspaceId");

    if (!subspaceId) {
        router.push("/subspaces");
    }

    return useMutation({
        mutationFn: (knowledgeSourceId: number) => deleteKnowledgeSource(knowledgeSourceId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["knowledgeBase", subspaceId] });
        },
        onError: (error) => {
            console.log(error);
            toastAxiosError(error);
        },
    });
}
