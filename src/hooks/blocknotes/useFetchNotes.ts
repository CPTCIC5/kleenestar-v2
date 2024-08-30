import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

async function fetchNotes(noteId: number) {
    const response = await axios.get(`/api/channels/blocknotes/${noteId}`, {
        withCredentials: true,
        headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
        },
    });
    return response.data;
}

export function useFetchNotes(noteId: number) {
    return useQuery({
        queryKey: ["Notes", noteId],
        queryFn: () => fetchNotes(noteId),
    });
}
