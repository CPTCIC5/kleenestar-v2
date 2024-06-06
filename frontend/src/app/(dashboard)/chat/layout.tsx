"use client";

import { ChatSidebar } from "@/components/custom/ChatSidebar";
import { useFetchConvos } from "@/hooks/useFetchConvos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Cookies from "js-cookie";
import { Convo } from "@/lib/types/interfaces";
import { toast } from "sonner";
import toastAxiosError from "@/lib/services/toastAxiosError";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const pathname = usePathname();
    const isChatRoot = pathname === "/chat/";
    

    const queryClient = useQueryClient();

    const [currentConvoId, setCurrentConvoId] = React.useState<number | null>(null);
    const { data: convos, isLoading, isSuccess } = useFetchConvos();
    const hasAddedConvo = React.useRef(false);

    React.useEffect(()=>{
        const chatIdMatch = pathname.match(/^\/chat\/(\d+)\/?$/);
        if(!isChatRoot && chatIdMatch){
            setCurrentConvoId(parseInt(chatIdMatch[1]));
        }

    },[pathname])

    const { mutate: addConvoMutation, isSuccess: addConvoSuccess } = useMutation({
        mutationFn: async () => {
            return await axios.post(
                `/api/channels/convos/`,
                {},
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
        onSuccess: async () => {
            console.log("Chat added");
            await queryClient.invalidateQueries({ queryKey: ["convos"] });
        },
        onSettled: async (data, error) => {
            try {
                console.log("chat setelled");
                const convos: Convo[] = (await queryClient.getQueryData(["convos"])) || [];
                console.log("convos", convos);
                if (convos.length > 0) {
                    const nextConvoId = convos[0].id;
                    setCurrentConvoId(nextConvoId);
                    console.log("nextConvoId", nextConvoId);
                    router.push(`/chat/${nextConvoId}`);
                } else {
                    router.push(`/chat`);
                }
            } catch (error) {
                console.error("Error handling mutation result:", error);
                toast.error("An unexpected error occurred. Please try again.");
            }
        },
        onError: (error) => {
            toastAxiosError(error);
        },
    });

    React.useEffect(() => {
        if (isSuccess && !hasAddedConvo.current) {
            if (convos.length > 0) {
                console.log("entered");

                if (isChatRoot) {
                    console.log("path changed to :", `/chat/${convos[0].id}`);
                    setCurrentConvoId(convos[0].id);
                    router.push(`/chat/${convos[0].id}`);
                }
            } else {
                hasAddedConvo.current = true; // Prevent further calls
                addConvoMutation();
            }
        }
    }, [isSuccess, convos, router, addConvoMutation]);

    return (
        <div className="w-full h-screen flex items-start justify-center flex-1 bg-muted/40 max-sm:pt-[56px]">
            <ChatSidebar currentConvoId={currentConvoId} setCurrentConvoId={setCurrentConvoId} />
            <div className=" flex-1 w-full h-full ">{children}</div>
        </div>
    );
}
