import axiosInstance from "../axios/AxiosInstance";

export async function getWorkspaceData() {
    try {
        const response = await axiosInstance.get(`/api/workspaces/`);
        if (response.data.length > 0) {
            return response.data[0];
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}
