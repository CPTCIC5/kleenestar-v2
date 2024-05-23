import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "sonner";
import axios, { AxiosProgressEvent } from "axios";

const uploadKnowledgeFile = async ({
    formData,
    onUploadProgressFn,
}: {
    formData: FormData;
    onUploadProgressFn: (progressEvent: AxiosProgressEvent) => void;
}) => {
    const response = await axios.post(`/api/channels/knowledgebase/`, formData, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
            "X-CSRFToken": Cookies.get("csrftoken"),
        },
        onUploadProgress: onUploadProgressFn,
    });
    return response.data;
};

export const useUploadKnowledgeFile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: uploadKnowledgeFile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["knowledgeBase"] });
            toast.success("Knowledge added successfully!");
        },
        onError: () => {
            toast.error("Failed to upload file");
        },
    });
};
