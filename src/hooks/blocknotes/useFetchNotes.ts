import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

interface FetchNotesProps {
    subspaceId: string | undefined;
    blocknoteId: number;
}

async function fetchNotes({ subspaceId, blocknoteId }: FetchNotesProps) {
    if (!subspaceId) {
        redirect("/subspaces");
    }
    const response = await axios.get(`/api/channels/blocknotes/${blocknoteId}`, {
        withCredentials: true,
        headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
        },
    });

    return {
        blocknote: {
            id: response?.data?.id,
            image: response?.data?.image,
            created_at: response?.data?.created_at,
            title: response?.data?.title,
        },
        related_notes: response?.data?.related_notes,
    };
}

export function useFetchNotes(blocknoteId: number) {
    const subspaceId = Cookies.get("subspaceId");

    return useQuery({
        queryKey: ["notes", blocknoteId, subspaceId],
        queryFn: () => fetchNotes({ subspaceId, blocknoteId }),
    });
}
