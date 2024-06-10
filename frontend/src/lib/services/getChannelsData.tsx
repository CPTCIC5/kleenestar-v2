import axios from "axios";
import Cookies from "js-cookie";

export async function getChannelsData() {
    try {
        const response = await axios.get(`/api/channels/`, {
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
}
