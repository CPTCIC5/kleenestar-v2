import { toastAxiosError } from "@/lib/axios/toastAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { toast } from "sonner";

interface UpdateNoteProps {
    blocknoteId: number;
    noteText: string;
    noteColor: string;
    noteTag: string | null;
}

async function updateNote({
    noteId,
    blocknoteId,
    noteText,
    noteColor,
    noteTag,
}: { noteId: number } & UpdateNoteProps) {
    await axios.patch(
        `/api/channels/note/${noteId}`,
        {
            blocknote: blocknoteId,
            note_text: noteText,
            color: noteColor,
            note_tag: noteTag,
        },
        {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken"),
            },
        },
    );
}

export function useUpdateNote() {
    const queryClient = useQueryClient();
    const subspaceId = Cookies.get("subspaceId");

    if (!subspaceId) {
        redirect("/subspaces");
    }

    return useMutation({
        mutationFn: updateNote,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["notes", variables.blocknoteId, subspaceId],
            });
            toast.success("note updated successfully");
        },
        onError: (error) => {
            console.log(error);
            toastAxiosError(error);
        },
    });
}
