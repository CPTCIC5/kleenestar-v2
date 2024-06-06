import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";
import Cookies from "js-cookie";
import toastAxiosError from "@/lib/services/toastAxiosError";

type CreateNoteType = {
    blocknote_id: number;
    note: string;
    color: string;
};

export function useCreateNote() {
    const mutation = useMutation({
        mutationFn: async ({ id, data }: { id: number; data: CreateNoteType }) => {
            console.log({ id, data });
            return await axios.post(
                `/api/channels/prompts/${id}/create-note/`,
                {
                    blocknote: data.blocknote_id,
                    note_text: data.note,
                    color: data.color,
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
            toast.success("Note Added successfully!");
        },
        onError: (error) => {
            toastAxiosError(error);
        },
    });

    return mutation;
}
