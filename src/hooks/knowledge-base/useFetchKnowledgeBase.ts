import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

async function fetchKnowledgeBase(subspaceId: string | undefined) {
    if (!subspaceId) {
        redirect("/subspaces");
    }

    const response = await axios.get(`/api/channels/knowledgebase/list_knowledge_sources/`, {
        withCredentials: true,
        headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
        },
    });

    return response.data;
}

export function useFetchKnowledgeBase() {
    const subspaceId = Cookies.get("subspaceId");

    return useQuery({
        queryKey: ["knowledgeBase", subspaceId],
        queryFn: () => fetchKnowledgeBase(subspaceId),
        enabled: !!subspaceId,
    });
}
