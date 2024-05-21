import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
        "ngrok-skip-browser-warning": "69420",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
    },
});

export default axiosInstance;
