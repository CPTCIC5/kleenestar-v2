"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function getUserData() {
    const cookieHeaders = cookies();
    const csrfToken = cookieHeaders.get("csrftoken")?.value;
    const sessionId = cookieHeaders.get("sessionid")?.value;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const response = await axios.get(`${baseUrl}/api/auth/users/me/`, {
            withCredentials: true,
            headers: {
                "ngrok-skip-browser-warning": "69420",
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
                Cookie: `sessionid=${sessionId}; csrftoken=${csrfToken}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching workspace data:", error);
        throw error;
    }
}
