import { getSubspaceData } from "@/lib/services/getSubspaceData";
import { useQuery } from "@tanstack/react-query";

export const useSubspaceData = () => {
    return useQuery({
        queryKey: ["subspaceData"],
        queryFn: getSubspaceData,
    });
};
