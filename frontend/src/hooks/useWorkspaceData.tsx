import { getWorkspaceData } from "@/lib/services/getWorkspaceData";
import { useQuery } from "@tanstack/react-query";

export const useWorkspaceData = () => {
    const { data, isSuccess, isError, error } = useQuery({
        queryKey: ["workspaceData"],
        queryFn: getWorkspaceData,
    });

    return {
        workspaceData: data,
        isWorkspaceSuccess: isSuccess,
        isWorkspaceError: isError,
        workspaceError: error,
    };
};
