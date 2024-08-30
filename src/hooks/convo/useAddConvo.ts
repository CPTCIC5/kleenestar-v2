import axios from "axios";
import Cookies from "js-cookie";
import { redirect, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toastAxiosError } from "@/lib/axios/toastAxiosError";

async function addConvo(subspaceId: string | undefined) {
    if (!subspaceId) {
        redirect("/subspaces");
    }

    return await axios.post(
        `/api/channels/convos/`,
        { subspace: subspaceId },
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

export function useAddConvo() {
    const subspaceId = Cookies.get("subspaceId");
    const queryClient = useQueryClient();
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: () => addConvo(subspaceId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["convos", subspaceId] });
        },
        onSettled: (data, error) => {
            if (error) {
                console.log(error);
                toastAxiosError(error);
                return;
            }
            if (data) {
                const newConvoId = data.data.id;
                router.push(`/dashboard/chat/${newConvoId}`);
            }
        },
        onError: (error) => {
            console.log(error);
            toastAxiosError(error);
        },
    });

    return mutation;
}
