import { useQuery } from "@tanstack/react-query";
import { fetchConvos } from "@/lib/services/getConvoData";

export const useFetchConvos = () => {
    return useQuery({
        queryKey: ["convos"],
        queryFn: fetchConvos,
        staleTime: 1000 * 60 * 5,
    });
};
