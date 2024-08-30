import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";
import Cookies from "js-cookie";
import { toastAxiosError } from "@/lib/axios/toastAxiosError";

interface CreateNoteProps {
    blocknoteId: number;
    noteText: string;
    noteColor: string;
    noteTag: string | null;
}

async function createNote({
    promptId,
    blocknoteId,
    noteText,
    noteColor,
    noteTag,
}: { promptId: number } & CreateNoteProps) {
    return await axios.post(
        `/api/channels/prompts/${promptId}/create-note/`,
        {
            blocknote: blocknoteId,
            note_text: noteText,
            color: noteColor,
            note_tag: noteTag,
        },
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

export function useCreateNote() {
    const queryClient = useQueryClient();
    const subspaceId = Cookies.get("subspaceId");

    const mutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes", subspaceId] });
            toast.success("Note created successfully");
        },
        onError: (error) => {
            console.log(error);
            toastAxiosError(error);
        },
    });

    return mutation;
}
