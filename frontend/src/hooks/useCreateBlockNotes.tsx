import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const createBlockNote = async ({ title, image }: { title: string; image: string | null }) => {
    const response = await axios.post(
        "/api/channels/blocknotes/",
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

export const useCreateBlockNote = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createBlockNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blockNotes"] });
        },
    });
};
