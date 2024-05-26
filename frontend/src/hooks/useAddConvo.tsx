import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useFetchConvos } from "./useFetchConvos";
import axios from "axios";
import Cookies from "js-cookie";

export const useAddConvo = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { refetch: refetchConvos } = useFetchConvos();

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
            console.log("chat added");
            queryClient.invalidateQueries({ queryKey: ["convos"] });
            const { data: convos } = await refetchConvos();
            if (convos && convos.length > 0) {
                const nextConvoId = convos[0].id;
                router.push(`/chat/${nextConvoId}`);
            } else {
                router.push(`/chat`);
            }
        },
        onError: () => {
            toast.error("An unexpected error occurred. Please try again.");
        },
    });

    return mutation;
};
