import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import Cookies from "js-cookie";

export function useSendInviteCode() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async ({ id, emailInput }: { id: string; emailInput: string }) => {
            return await axios.post(
                `/api/workspaces/${id}/create-invite/`,
                {
                    email: emailInput,
                },
                {
                    withCredentials: true,
                    headers: {
                        "ngrok-skip-browser-warning": "69420",
                        "Content-Type": "application/json",
                        "X-CSRFToken": Cookies.get("csrftoken"),
                    },
                },
            );
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
