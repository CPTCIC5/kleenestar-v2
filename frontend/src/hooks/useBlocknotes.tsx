import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchBlockNotes = async () => {
    const response = await axios.get("/api/channels/blocknotes/", {
        withCredentials: true,
        headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
        },
    });
    return response.data;
};

export const useBlockNotes = () => {
    return useQuery({
        queryKey: ["blockNotes"],
        queryFn: fetchBlockNotes,
        staleTime: 1000 * 60 * 5,
    });
};
