import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Convo } from "@/lib/types/interfaces";
import { isConvoEmpty } from "@/lib/services/isConvoEmpty";
import toastAxiosError from "@/lib/services/toastAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddConvo = (subspaceId: number) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async () => {
            return await axios.post(
                `/api/channels/convos/`,
                { subspace: subspaceId },
                {
                    withCredentials: true,
                    headers: {
                        "ngrok-skip-browser-warning": "69420",
                        "Content-Type": "application/json",
                        "X-CSRFToken": Cookies.get("csrftoken"),
                    },
                },
            );
        },
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

    const addChat = async () => {
        try {
            const convos: Convo[] = queryClient.getQueryData(["convos", subspaceId]) || [];
            const lastConvoId = convos.length > 0 ? convos[0].id : null;

            if (lastConvoId) {
                const isLastConvoEmpty = await isConvoEmpty(lastConvoId);
                if (!isLastConvoEmpty) {
                    mutation.mutate();
                    return;
                }
            }
        } catch (error) {
            toastAxiosError(error);
        }
    };

    return { addConvoMutation: mutation, addChat, isPending: mutation.isPending };
};
