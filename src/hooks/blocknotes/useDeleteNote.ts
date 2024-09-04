import { toastAxiosError } from "@/lib/axios/toastAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface DeleteNoteProps {
    noteId: number;
    blocknoteId: number;
}

async function deleteNote({ noteId, blocknoteId }: DeleteNoteProps) {
    await axios.delete(`/api/channels/note/${noteId}/`, {
        withCredentials: true,
        headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
        },
    });
}

export function useDeleteNote() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const subspaceId = Cookies.get("subspaceId");

    if (!subspaceId) {
        router.push("/subspaces");
    }

    return useMutation({
        mutationFn: deleteNote,
        onSuccess: async (data, variable) => {
            await queryClient.invalidateQueries({
                queryKey: ["notes", variable.blocknoteId, subspaceId],
            });
        },
        onError: (error) => {
            console.log(error);
            toastAxiosError(error);
        },
    });
}
