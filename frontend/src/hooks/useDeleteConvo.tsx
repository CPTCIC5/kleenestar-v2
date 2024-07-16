import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Convo } from "@/lib/types/interfaces";
import toastAxiosError from "@/lib/services/toastAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteConvo = async (id: number) => {
    await axios.delete(`/api/channels/convos/${id}/`, {
        withCredentials: true,
        headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
        },
    });
};

const useDeleteConvo = (subspaceId: number) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: (id: number) => deleteConvo(id),

        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["convos", subspaceId] });
        },
        onSettled: async (data, error) => {
            try {
                const convos: Convo[] =
                    (await queryClient.getQueryData(["convos", subspaceId])) || [];
                if (convos.length > 0) {
                    const nextConvoId = convos[0].id;
                    router.push(`/chat/${subspaceId}/${nextConvoId}`);
                } else {
                    router.push(`/chat/${subspaceId}`);
                }
            } catch (error) {
                console.error("Error handling mutation result:", error);
            }
        },
        onError: (error) => {
            toastAxiosError(error);
        },
    });
};

export default useDeleteConvo;
