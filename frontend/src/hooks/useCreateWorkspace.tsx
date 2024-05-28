import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CreateWorkspaceFormSchemaTypes } from "@/lib/types/types";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";
import toastAxiosError from "@/lib/services/toastAxiosError";

export function useCreateWorkspace() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async (data: CreateWorkspaceFormSchemaTypes) => {
            try {
                const response = await axios.post(
                    `/api/workspaces/`,
                    {
                        business_name: data.businessName,
                        website_url: data.Website,
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
