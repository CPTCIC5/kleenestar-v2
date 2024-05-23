import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

const deleteKnowledgeFile = async (id: number) => {
    const response = await axios.delete(`/api/channels/knowledgebase/${id}/`, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
        },
    });
    return response.data;
};

export const useDeleteKnowledgeFile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteKnowledgeFile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["knowledgeBase"] });
            toast.success("Knowledge file deleted successfully!");
        },
        onError: () => {
            toast.error("Unable to delete the knowledge base file");
        },
    });
};
