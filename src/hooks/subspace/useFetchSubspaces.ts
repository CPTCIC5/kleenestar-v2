import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

export async function fetchSubspaces() {
    const response = await axios.get(`/api/channels/subspaces/`, {
        withCredentials: true,
        headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
        },
    });
    return response.data;
}

export function useFetchSubspaces() {
    return useQuery({
        queryKey: ["subspaces"],
        queryFn: fetchSubspaces,
    });
}
