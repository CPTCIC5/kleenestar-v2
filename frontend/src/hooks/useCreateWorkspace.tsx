import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { CreateWorkspaceFormSchemaTypes } from "@/lib/types/types";
import toastAxiosError from "@/lib/services/toastAxiosError";

const createWorkspaceApi = async (data: CreateWorkspaceFormSchemaTypes) => {
    const newWebsiteUrl = data.website.toLowerCase();

    return axios.post(
        `/api/workspaces/`,
        {
            business_name: data.businessName,
            website_url: newWebsiteUrl,
            Industry: data.industry,
        },
        {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken"),
            },
        },
    );
};

export function useCreateWorkspace() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: createWorkspaceApi,
        onSuccess: () => {
            toast.success("Workspace created successfully!");
            router.push("/select-subspace");
        },
        onError: (error) => {
            toastAxiosError(error);
        },
    });

    return mutation;
}
