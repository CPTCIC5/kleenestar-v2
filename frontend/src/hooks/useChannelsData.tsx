import { getChannelsData } from "@/lib/services/getChannelsData";
import { useQuery } from "@tanstack/react-query";

export const useChannelsData = (subspaceId: number) => {
    return useQuery({
        queryKey: ["channelsData", subspaceId],
        queryFn: () => getChannelsData(subspaceId),
        enabled: !!subspaceId, // Ensure the query only runs if subspaceId is provided
    });
};
