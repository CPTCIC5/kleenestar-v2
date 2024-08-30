import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toastAxiosError } from "@/lib/axios/toastAxiosError";

interface AddSubspaceProps {
    workspace_id: number;
    name: string;
}

async function addSubspace(data: AddSubspaceProps) {
    const { workspace_id, name } = data;
    return await axios.post(
        `/api/channels/subspaces/`,
        {
            workspace: workspace_id,
            name: name,
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

export function useAddSubspace() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: addSubspace,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["subspaces"] });
            toast.success("Subspace added successfully");
        },
        onError: (error) => {
            console.log(error);
            toastAxiosError(error);
        },
    });

    return mutation;
}
