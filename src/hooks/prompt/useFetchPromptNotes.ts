import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

async function fetchPromptNotes(convoId: number) {
    const response = await axios.get(`/api/channels/convos/${convoId}/`, {
        withCredentials: true,
        headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
        },
    });
    return response.data.all_notes;
}

export const useFetchPromptNotes = (convoId: number) => {
    const query = useQuery({
        queryKey: ["promptNotes", convoId],
        queryFn: () => fetchPromptNotes(convoId),
        enabled: !!convoId,
    });

    if (query.error) {
        console.log("error", query.error);
    }

    return query;
};
