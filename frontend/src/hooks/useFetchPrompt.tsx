import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchPrompts = async (convoId: number) => {
    const { data } = await axios.get(`/api/channels/convos/${convoId}/prompts/`, {
        withCredentials: true,
        headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
        },
    });
    return data.results;
};

export const useFetchPrompts = (convoId: number) => {
    return useQuery({
        queryKey: ["prompts", convoId],
        queryFn: () => fetchPrompts(convoId),
        enabled: !!convoId,
    });
};
