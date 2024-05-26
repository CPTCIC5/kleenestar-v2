import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CreateWorkspaceFormSchemaTypes } from "@/lib/types/types";
import Cookies from "js-cookie";
import axios from "axios";

export function useCreateWorkspace() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async (data: CreateWorkspaceFormSchemaTypes) => {
            return await axios.post(
                `/api/workspaces/`,
                {
                    business_name: data.businessName,
                    website_url: data.Website,
                    industry: data.selectedOption,
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
        },
        onSuccess: () => {
            toast.success("Workspace Created Successfully!");
            router.push("/chat");
        },
        onError: (error) => {
            toast.error("Failed to create Workspace, please try again");
        },
    });

    return mutation;
}
