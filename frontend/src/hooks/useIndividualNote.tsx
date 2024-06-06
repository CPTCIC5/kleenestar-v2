import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchIndividualNotes = async (noteId: number) => {
    const response = await axios.get(`/api/channels/blocknotes/${noteId}`, {
        withCredentials: true,
        headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
        },
    });
    return response.data;
};

export const useIndividualNotes = (noteId: number) => {
    return useQuery({
        queryKey: ["IndividualNotes", noteId],
        queryFn: () => fetchIndividualNotes(noteId),
        staleTime: 1000 * 60 * 5,
    });
};
