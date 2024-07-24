import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateSubspaceFormSchemaTypes, CreateWorkspaceFormSchemaTypes } from "@/lib/types/types";
import toastAxiosError from "@/lib/services/toastAxiosError";

const createSubspaceApi = async ({
    workspace_id,
    data,
}: {
    workspace_id: number;
    data: CreateSubspaceFormSchemaTypes;
}) => {
    return axios.post(
        `/api/channels/subspaces/`,
        {
            workspace: workspace_id,
            name: data.name,
            industry: `${data.industry}`,
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

export function useCreateSubspace() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createSubspaceApi,
        onSuccess: () => {
            const validationdata = queryClient.invalidateQueries({ queryKey: ["subspaceData"] });
            console.log(validationdata);
            console.log("Subspace created successfully!");
            toast.success("Subspace created successfully!");
        },
        onError: (error) => {
            toastAxiosError(error);
        },
    });

    return mutation;
}
