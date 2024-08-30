import { toastAxiosError } from "@/lib/axios/toastAxiosError";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { toast } from "sonner";

interface CreateBlocknoteProps {
    blocknoteTitle: string;
    blocknoteIcon: string;
}

async function createBlocknote({
    blocknoteTitle,
    blocknoteIcon,
    subspaceId,
}: CreateBlocknoteProps & { subspaceId: string | undefined }) {
    if (!subspaceId) {
        redirect("/subspaces");
    }

    const response = await axios.post(
        "/api/channels/blocknotes/",
        {
            title: blocknoteTitle,
            image: blocknoteIcon,
            subspace: subspaceId,
        },
        {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken"),
            },
        },
    );
    return response.data;
}

export function useCreateBlocknote() {
    const queryClient = useQueryClient();
    const subspaceId = Cookies.get("subspaceId");

    return useMutation({
        mutationFn: ({ blocknoteTitle, blocknoteIcon }: CreateBlocknoteProps) =>
            createBlocknote({ blocknoteTitle, blocknoteIcon, subspaceId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blocknotes", subspaceId] });
            toast.success("Blocknote created successfully");
        },
        onError: (error) => {
            console.error(error);
            toastAxiosError(error);
        },
    });
}
