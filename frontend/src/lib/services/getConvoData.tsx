import axios from "axios";
import Cookies from "js-cookie";

export async function fetchConvos(subspaceId: number) {
    try {
        const response = await axios.get(`/api/channels/convos/?subspace=${subspaceId}`, {
            withCredentials: true,
            headers: {
                "ngrok-skip-browser-warning": "69420",
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken"),
            },
        });
        return response.data.results;
    } catch (error) {
        throw error;
    }
}
