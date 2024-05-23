import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios/AxiosInstance";

export function useSendInviteCode() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async ({ id, emailInput }: { id: string; emailInput: string }) => {
            return await axiosInstance.post(`/api/workspaces/${id}/create-invite/`, {
                email: emailInput,
            });
        },
        onSuccess: () => {
            toast.success("Invite link sent");
        },
        onError: (error) => {
            toast.error("Oops! something went wrong");
        },
    });

    return mutation;
}
