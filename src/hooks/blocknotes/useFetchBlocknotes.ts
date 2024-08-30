import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

async function fetchBlocknotes(subspaceId: string | undefined) {
    if (!subspaceId) {
        redirect("/subspaces");
    }

    const response = await axios.get(`/api/channels/blocknotes/?subspace=${subspaceId}`, {
        withCredentials: true,
        headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
        },
    });

    return response.data;
}

export function useFetchBlocknotes() {
    const subspaceId = Cookies.get("subspaceId");

    return useQuery({
        queryKey: ["blocknotes", subspaceId],
        queryFn: () => fetchBlocknotes(subspaceId),
        enabled: !!subspaceId,
    });
}
