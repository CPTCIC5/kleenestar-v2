import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import Cookies from "js-cookie";
import { toastAxiosError } from "@/lib/axios/toastAxiosError";

interface InviteTeamMemberProps {
    workspaceId: string;
    memberEmail: string;
}

async function inviteTeamMember({ workspaceId, memberEmail }: InviteTeamMemberProps) {
    return await axios.post(
        `/api/workspaces/${workspaceId}/create-invite/`,
        {
            email: memberEmail,
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
}

export function useInviteTeamMember() {
    const mutation = useMutation({
        mutationFn: inviteTeamMember,
        onSuccess: () => {
            toast.success("Invite code sent successfully");
        },
        onError: (error) => {
            console.error(error);
            toastAxiosError(error);
        },
    });

    return mutation;
}
