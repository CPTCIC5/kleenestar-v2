import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { toastAxiosError } from "@/lib/axios/toastAxiosError";

async function removeChannel(channelId: number) {
    await axios.delete(`/api/channels/${channelId}/`, {
        withCredentials: true,
        headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
        },
    });
}

export function useRemoveChannel() {
    const queryClient = useQueryClient();
    const subspaceId = Cookies.get("subspaceId");

    return useMutation({
        mutationFn: removeChannel,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["channels", subspaceId] });
            toast.success("Channel removed successfully!");
        },
        onError: (error) => {
            console.log(error);
            toastAxiosError(error);
        },
    });
}
