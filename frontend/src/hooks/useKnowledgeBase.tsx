import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { KnowledgeDataTypes } from "@/lib/types/interfaces";
import { convertDateTime } from "@/lib/services/convertDateTime";

const fetchKnowledgeBase = async () => {
    const response = await axios.get(`/api/channels/knowledgebase/`, {
        withCredentials: true,
        headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
        },
    });
    return response.data.map((files: { title: string; created_at: string; id: number }) => {
        const fileSplit = files.title.split(".");
        const type = fileSplit.pop();
        const titleWithoutExtension = fileSplit.join(".");

        return {
            title: titleWithoutExtension,
            type: type,
            createdAt: convertDateTime(files.created_at),
            id: files.id,
        };
    });
};

export const useKnowledgeBase = () => {
    return useQuery<KnowledgeDataTypes[]>({
        queryKey: ["knowledgeBase"],
        queryFn: fetchKnowledgeBase,
    });
};


