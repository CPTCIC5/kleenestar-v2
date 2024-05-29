import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { CreateWorkspaceFormSchemaTypes } from "@/lib/types/types";
import toastAxiosError from "@/lib/services/toastAxiosError";

export function useCreateWorkspace() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async (data: CreateWorkspaceFormSchemaTypes) => {
            try {
                const newWebsiteUrl = data.Website.toLowerCase();

                const response = await axios.post(
                    `/api/workspaces/`,
                    {
                        business_name: data.businessName,
                        website_url: newWebsiteUrl,
                        Industry: data.selectedOption,
                    },
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                            "X-CSRFToken": Cookies.get("csrftoken"),
                        },
                    },
                );
            } catch (error) {
                throw error;
            }
        },
        onSuccess: () => {
            toast.success("Workspace Created Successfully!");
            router.push("/chat");
        },
        onError: (error) => {
            toastAxiosError(error);
        },
    });

    return mutation;
}
