import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SettingsProfileFormSchemaTypes } from "@/lib/types/types";
import axiosInstance from "@/lib/axios/AxiosInstance";

export function useEditUserProfile() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async ({
            data,
            userId,
        }: {
            data: SettingsProfileFormSchemaTypes;
            userId: number;
        }) => {
            return await axiosInstance.patch(`/api/auth/users/${userId}/`, {
                first_name: data.firstName,
                last_name: data.lastName,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userData"] });
            toast.success("Name updated successfully");
        },
        onError: (error) => {
            toast.error("An unexpected error occurred. Please try again.");
        },
    });

    return mutation;
}
