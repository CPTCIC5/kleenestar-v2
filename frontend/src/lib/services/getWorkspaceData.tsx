import axios from "axios";
import Cookies from "js-cookie";

export async function getWorkspaceData() {
    try {
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
    } catch (error) {
        throw error;
    }
}
