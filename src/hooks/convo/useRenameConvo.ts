import axios from "axios";
import Cookies from "js-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toastAxiosError } from "@/lib/axios/toastAxiosError";

interface RenameConvoProps {
    convoId: number;
    newConvoName: string;
}

async function renameConvo({ convoId, newConvoName }: RenameConvoProps) {
    await axios.patch(
        `/api/channels/convos/${convoId}/`,
        { title: newConvoName },
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

export function useRenameConvo() {
    const queryClient = useQueryClient();
    const subspaceId = Cookies.get("subspaceId");

    return useMutation({
        mutationFn: renameConvo,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["convos", subspaceId] });
            // queryClient.invalidateQueries({ queryKey: ["prompts", variables.convoId] });
        },
        onError: (error) => {
            console.log(error);
            toastAxiosError(error);
        },
    });
}
