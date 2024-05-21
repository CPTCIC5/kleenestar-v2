import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CreateWorkspaceFormSchemaTypes } from "@/lib/types/types";
import axiosInstance from "@/lib/axios/AxiosInstance";

export function useCreateWorkspace() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async (data: CreateWorkspaceFormSchemaTypes) => {
            return await axiosInstance.post(`/api/workspaces/`, {
                business_name: data.businessName,
                website_url: data.Website,
                industry: data.selectedOption,
            });
        },
        onSuccess: () => {
            toast.success("Workspace Created Successfully!");
            router.push("/chat");
        },
        onError: (error) => {
            console.log("workspace Error", error);
            toast.error("Failed to create Workspace, please try again");
        },
    });

    return mutation;
}
