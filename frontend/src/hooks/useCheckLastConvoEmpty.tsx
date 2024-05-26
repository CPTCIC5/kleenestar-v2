import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const checkIsEmpty = async (convoId: number) => {
    const response = await axios.get(`/api/channels/convos/${convoId}/prompts/`, {
        withCredentials: true,
        headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
        },
    });
    return response.data.count === 0;
};

export const useCheckLastConvoEmpty = (convoId: number | null) => {
    return useQuery({
        queryKey: ["checkIsEmpty", convoId],
        queryFn: () => checkIsEmpty(convoId!),
        enabled: !!convoId, // Only run the query if convoId is not null
    });
};
