import axios from "axios";
import Cookies from "js-cookie";

export const getSubspaceData = async () => {
    try {
        const response = await axios.get(`/api/channels/subspaces/`, {
            withCredentials: true,
            headers: {
                "ngrok-skip-browser-warning": "69420",
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken"),
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
