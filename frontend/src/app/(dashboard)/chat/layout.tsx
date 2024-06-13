"use client";

import React from "react";
import { useAddConvo } from "@/hooks/useAddConvo";
import { useFetchConvos } from "@/hooks/useFetchConvos";
import { usePathname, useRouter } from "next/navigation";

import { ChatSidebar } from "@/components/custom/ChatSidebar";

export default function ChatLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const pathname = usePathname();
    const isChatRoot = pathname === "/chat/";

    const hasAddedConvo = React.useRef(false);
    const { data: convos, isSuccess } = useFetchConvos();

    const { addConvoMutation } = useAddConvo();
    const { mutate: addConvoMutate, isSuccess: addConvoSuccess } = addConvoMutation;

    React.useEffect(() => {
        if (isSuccess && !hasAddedConvo.current) {
            if (convos.length > 0) {
                console.log("entered");

                if (isChatRoot) {
                    console.log("path changed to :", `/chat/${convos[0].id}`);
                    router.push(`/chat/${convos[0].id}`);
                }
            } else {
                hasAddedConvo.current = true; // Prevent further calls
                addConvoMutate();
            }
        }
    }, [isSuccess, convos, router, addConvoMutate, isChatRoot]);

    return <div className="w-full h-screen flex-1 bg-muted/40 max-sm:pt-[56px]">{children}</div>;
}
