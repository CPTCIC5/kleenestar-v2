import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useFetchConvos } from "./useFetchConvos";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import axios from "axios";

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

const useDeleteConvo = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { refetch: refetchConvos } = useFetchConvos();

    return useMutation({
        mutationFn: (id: number) => deleteConvo(id),
        onSuccess: async () => {
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
};

export default useDeleteConvo;
