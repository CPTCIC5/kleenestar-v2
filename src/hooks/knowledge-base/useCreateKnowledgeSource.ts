import { toastAxiosError } from "@/lib/axios/toastAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { toast } from "sonner";

interface CreateKnowledgeSourceProps {
    knowledgeSourceTitle: string;
    knowledgeSourceText: string;
}

async function createKnowledgeSource({
    knowledgeSourceTitle,
    knowledgeSourceText,
    subspaceId,
}: CreateKnowledgeSourceProps & { subspaceId: string | undefined }) {
    if (!subspaceId) {
        redirect("/subspaces");
    }

    const response = await axios.post(
        `/api/channels/knowledgebase/${subspaceId}/create_knowledge_source/`,
        {
            text_data: knowledgeSourceText,
        },
        {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken"),
            },
        },
    );
    return response.data;
}

export function useCreateKnowledgeSource() {
    const queryClient = useQueryClient();
    const subspaceId = Cookies.get("subspaceId");

    return useMutation({
        mutationFn: ({ knowledgeSourceTitle, knowledgeSourceText }: CreateKnowledgeSourceProps) =>
            createKnowledgeSource({ knowledgeSourceTitle, knowledgeSourceText, subspaceId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["knowledgeBase", subspaceId] });
            toast.success("Knowledge source created successfully");
        },
        onError: (error) => {
            console.error(error);
            toastAxiosError(error);
        },
    });
}
