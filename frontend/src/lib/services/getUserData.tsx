import axiosInstance from "../axios/AxiosInstance";

export async function getUserData() {
    try {
        const response = await axiosInstance.get(`/api/auth/users/me/`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
