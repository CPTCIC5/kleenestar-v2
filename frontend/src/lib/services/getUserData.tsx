import axios from "axios";
import Cookies from "js-cookie";

export async function getUserData() {
    try {
        const response = await axios.get(`/api/auth/users/me/`, {
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
