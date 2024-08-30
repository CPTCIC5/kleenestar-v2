import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

export async function fetchConvos(subspaceId: string | undefined) {
    if (!subspaceId) {
        redirect("/subspaces");
    }

    const response = await axios.get(`/api/channels/convos/?subspace=${subspaceId}`, {
        withCredentials: true,
        headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
        },
    });
    return response.data.results;
}

export function useFetchConvos() {
    const subspaceId = Cookies.get("subspaceId");

    return useQuery({
        queryKey: ["convos", subspaceId],
        queryFn: () => fetchConvos(subspaceId),
    });
}
