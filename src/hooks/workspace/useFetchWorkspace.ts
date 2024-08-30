import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

export async function fetchWorkspace() {
    const response = await axios.get(`/api/workspaces/`, {
        withCredentials: true,
        headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
        },
    });

    if (response.data.length > 0) {
        return response.data[0];
    } else {
        return null;
    }
}

export function useFetchWorkspace() {
    return useQuery({
        queryKey: ["workspace"],
        queryFn: fetchWorkspace,
    });
}
