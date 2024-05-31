import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import Cookies from "js-cookie";
import toastAxiosError from "@/lib/services/toastAxiosError";
import { Convo } from "@/lib/types/interfaces";
import { isConvoEmpty } from "@/lib/services/isConvoEmpty";

export const useAddConvo = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async () => {
            return await axios.post(
                `/api/channels/convos/`,
                {},
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
            console.log("Chat added");
            await queryClient.invalidateQueries({ queryKey: ["convos"] });
        },
        onSettled: async (data, error) => {
            try {
                const convos: Convo[] = (await queryClient.getQueryData(["convos"])) || [];

                if (convos.length > 0) {
                    const nextConvoId = convos[0].id;
                    router.push(`/chat/${nextConvoId}`);
                } else {
                    router.push(`/chat`);
                }
            } catch (error) {
                console.error("Error handling mutation result:", error);
                toast.error("An unexpected error occurred. Please try again.");
            }
        },
        onError: (error) => {
            toastAxiosError(error);
        },
    });

    const addChat = async () => {
        try {
            const convos: Convo[] = queryClient.getQueryData(["convos"]) || [];
            const lastConvoId = convos.length > 0 ? convos[0].id : null;

            if (lastConvoId) {
                const isLastConvoEmpty = await isConvoEmpty(lastConvoId);
                if (!isLastConvoEmpty) {
                    console.log("Last convo is not empty, proceeding with mutation");
                    mutation.mutate();
                    return;
                }
            }

            console.log("Last convo is empty, not adding a new chat");
        } catch (error) {
            console.error("Error checking if last convo is empty:", error);
            toast.error("Failed to check if last convo is empty");
        }
    };

    return { addChat, isPending: mutation.isPending };
};
