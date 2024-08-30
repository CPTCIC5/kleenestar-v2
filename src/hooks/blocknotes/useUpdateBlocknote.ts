import { toastAxiosError } from "@/lib/axios/toastAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { toast } from "sonner";

interface UpdateBlocknoteProps {
    blocknoteId: number;
    blocknoteTitle: string;
    blocknoteIcon: string;
}

async function updateBlocknote({
    blocknoteId,
    blocknoteTitle,
    blocknoteIcon,
}: UpdateBlocknoteProps) {
    await axios.patch(
        `/api/channels/blocknotes/${blocknoteId}`,
        {
            title: blocknoteTitle,
            icon: blocknoteIcon,
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

export function useUpdateBlocknote() {
    const queryClient = useQueryClient();
    const subspaceId = Cookies.get("subspaceId");

    if (!subspaceId) {
        redirect("/subspaces");
    }

    return useMutation({
        mutationFn: updateBlocknote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blocknotes", subspaceId] });
            toast.success("blocknote updated successfully");
        },
        onError: (error) => {
            console.log(error);
            toastAxiosError(error);
        },
    });
}
