import { getChannelsData } from "@/lib/services/getChannelsData";
import { useQuery } from "@tanstack/react-query";

export const useChannelsData = () => {
    return useQuery({
        queryKey: ["channelsData"],
        queryFn: getChannelsData,
    });
};
