import toastAxiosError from "@/lib/services/toastAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface Blocknote {
    id: number;
    image: string;
    created_at: string;
    title: string;
}

const deleteBlockNote = async (id: number) => {
    await axios.delete(`/api/channels/blocknotes/${id}/`, {
        withCredentials: true,
        headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
        },
    });
};

export const useDeleteBlockNote = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation({
        mutationFn: (id: number) => deleteBlockNote(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["blockNotes"] });
        },
        onSettled: async (data, error) => {
            try {
                const blocknotes: Blocknote[] =
                    (await queryClient.getQueryData(["blockNotes"])) || [];
                if (blocknotes.length > 0) {
                    const nextBlocknoteId = blocknotes[0].id;
                    router.push(`/blocknotes/${nextBlocknoteId}`);
                } else {
                    router.push(`/blocknotes`);
                }
            } catch (error) {
                console.error("Error handling mutation result of blocknotes:", error);
            }
        },
        onError: (error) => {
            toastAxiosError(error);
        },
    });
};
