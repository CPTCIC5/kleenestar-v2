import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

export async function fetchChannels(subspaceId: string | undefined) {
    if (!subspaceId) {
        redirect("/subspaces");
    }

    const response = await axios.get(`/api/channels/?subspace=${subspaceId}`, {
        withCredentials: true,
        headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
        },
    });
    return response.data;
}

export function useFetchChannels() {
    const subspaceId = Cookies.get("subspaceId");
    return useQuery({
        queryKey: ["channels", subspaceId],
        queryFn: () => fetchChannels(subspaceId),
        enabled: !!subspaceId, // Ensure the query only runs if subspaceId is provided
    });
}
