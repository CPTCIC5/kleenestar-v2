import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

export async function fetchUser() {
    const response = await axios.get(`/api/auth/users/me/`, {
        withCredentials: true,
        headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
        },
    });
    return response.data;
}

export function useFetchUser() {
    return useQuery({
        queryKey: ["user"],
        queryFn: fetchUser,
    });
}
