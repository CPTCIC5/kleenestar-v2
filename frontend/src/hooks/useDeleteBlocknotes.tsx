import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

const deleteBlockNote = async (id: number) => {
    await axios.delete(`/api/channels/blocknotes/${id}/`, {
        withCredentials: true,
        headers: {
            "X-CSRFToken": Cookies.get("csrftoken"),
        },
    });
};

export const useDeleteBlockNote = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteBlockNote,
        onSuccess: () => {
            toast.success("BlockNote Deleted Successfully!");
            queryClient.invalidateQueries({ queryKey: ["blockNotes"] });
        },
        onError: () => {
            toast.error("Failed to delete Block Note");
        },
    });
};
