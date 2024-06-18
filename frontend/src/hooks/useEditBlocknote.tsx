import toastAxiosError from "@/lib/services/toastAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

const editBlockNote = async ({
    blocknoteId,
    title,
    image,
}: {
    blocknoteId: number;
    title: string;
    image: string | null;
}) => {
    const response = await axios.patch(
        `/api/channels/blocknotes/${blocknoteId}`,
        { title, image },
        {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken"),
            },
        },
    );
    return response.data;
};

export const useEditBlockNote = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: editBlockNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blockNotes"] });
            toast.success("Blocknote edited successfully");
        },
        onError: (error) => {
            toastAxiosError(error);
        },
    });
};
