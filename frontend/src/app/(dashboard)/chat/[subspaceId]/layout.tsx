"use client";

import React, { useEffect, useRef } from "react";
import { useAddConvo } from "@/hooks/useAddConvo";
import { useFetchConvos } from "@/hooks/useFetchConvos";
import { usePathname, useRouter } from "next/navigation";

interface ChatLayoutProps {
    children: React.ReactNode;
}

const RootChatLayout: React.FC<ChatLayoutProps> = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const subspaceId = Number(pathname.split("/")[2]);
    const isChatRoot = pathname === `/chat/${subspaceId}/`;

    const hasAddedConvo = useRef(false);
    const { data: convos, isSuccess } = useFetchConvos(subspaceId);

    const { addConvoMutation } = useAddConvo(subspaceId);
    const { mutate: addConvoMutate } = addConvoMutation;

    useEffect(() => {
        if (isSuccess && !hasAddedConvo.current) {
            if (convos.length > 0) {
                if (isChatRoot) {
                    router.push(`/chat/${subspaceId}/${convos[0].id}`);
                }
            } else {
                hasAddedConvo.current = true; // Prevent further calls
                addConvoMutate();
            }
        }
    }, [isSuccess, convos, router, addConvoMutate, isChatRoot, subspaceId]);

    return <div className="w-full h-screen flex-1 bg-muted/40">{children}</div>;
};

export default RootChatLayout;
