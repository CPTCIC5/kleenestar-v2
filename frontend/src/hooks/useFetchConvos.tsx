import { useQuery } from "@tanstack/react-query";
import { fetchConvos } from "@/lib/services/getConvoData";

export const useFetchConvos = (subspaceId: number) => {
    return useQuery({
        queryKey: ["convos", subspaceId],
        queryFn: () => fetchConvos(subspaceId),
        staleTime: 1000 * 60 * 5,
    });
};
