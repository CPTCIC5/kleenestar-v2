import { getUserData } from "@/lib/services/getUserData";
import { useQuery } from "@tanstack/react-query";

export const useUserData = () => {
    const { data, isSuccess, isError, error } = useQuery({
        queryKey: ["userData"],
        queryFn: getUserData,
    });

    return { userData : data, isUserSuccess:isSuccess, isUserError: isError, userError: error };
};
