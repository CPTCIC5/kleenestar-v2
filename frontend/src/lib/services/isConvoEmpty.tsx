import axios from "axios";
import Cookies from 'js-cookie';

export const isConvoEmpty = async (convoId: number) => {
    const response = await axios.get(`/api/channels/convos/${convoId}/prompts/`, {
        withCredentials: true,
        headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
        },
    });
    return response.data.count === 0;
};