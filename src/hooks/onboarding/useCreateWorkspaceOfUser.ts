import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { CreateWorkspaceFormSchemaTypes } from "../../types/zod.types";
import { toastAxiosError } from "@/lib/axios/toastAxiosError";

async function createWorkspaceofUser(data: CreateWorkspaceFormSchemaTypes) {
    const { businessName, website, industry } = data;
    const newWebsiteUrl = website.toLowerCase();

    return await axios.post(
        `/api/workspaces/`,
        {
            business_name: businessName,
            website_url: newWebsiteUrl,
            Industry: industry,
        },
        {
            withCredentials: true,
            headers: {
                "ngrok-skip-browser-warning": "69420",
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken"),
            },
        },
    );
}

export function useCreateWorkspaceOfUser() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: createWorkspaceofUser,
        onSuccess: () => {
            toast.success("Workspace created successfully");
            router.push("/subspaces");
        },
        onError: (error) => {
            console.log("error", error);
            toastAxiosError(error);
        },
    });

    return mutation;
}
