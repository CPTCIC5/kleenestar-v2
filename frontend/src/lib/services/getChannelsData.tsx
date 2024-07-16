import axios from "axios";
import Cookies from "js-cookie";

export async function getChannelsData(subspaceId: number) {
    try {
        const response = await axios.get(`/api/channels/?subspace=${subspaceId}`, {
            withCredentials: true,
            headers: {
                "ngrok-skip-browser-warning": "69420",
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken"),
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching channels data:", error);
        throw new Error("Failed to fetch channels data");
    }
}
