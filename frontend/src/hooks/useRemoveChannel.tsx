import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Convo } from "@/lib/types/interfaces";
import toastAxiosError from "@/lib/services/toastAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const removeChannel = async (id: number) => {
    await axios.delete(`/api/channels/${id}/`, {
        withCredentials: true,
        headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
        },
    });
};

const useRemoveChannel = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: (id: number) => removeChannel(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["channelsData"] });
            toast.success("Channel removed successfully!");
        },
        onError: (error) => {
            toastAxiosError(error);
        },
    });
};

export default useRemoveChannel;
