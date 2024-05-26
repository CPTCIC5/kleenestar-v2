import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";
import Cookies from "js-cookie";

const renameConvo = async (id: number, newName: string) => {
    await axios.patch(
        `/api/channels/convos/${id}/`,
        { title: newName },
        {
            withCredentials: true,
            headers: {
                "ngrok-skip-browser-warning": "69420",
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken"),
            },
        },
    );
};

const useRenameConvo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, newName }: { id: number; newName: string }) => renameConvo(id, newName),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["convos"] });
        },
        onError: () => {
            toast.error("An unexpected error occurred. Please try again.");
        },
    });
};

export default useRenameConvo;
