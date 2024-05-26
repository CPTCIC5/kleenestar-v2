"use client";

import RippleLoader from "@/components/ui/ripple-loader";
import { useAddConvo } from "@/hooks/useAddConvo";
import { useFetchConvos } from "@/hooks/useFetchConvos";
import { useRouter } from "next/navigation";
import React from "react";

function ChatPageNew() {
    const { data: convos, isLoading, isSuccess, error, refetch: refetchConvos } = useFetchConvos();
    const router = useRouter();

    const { mutateAsync: addConvoMutation, isSuccess: addConvoSuccess } = useAddConvo();
    const hasAddedConvo = React.useRef(false);

    React.useEffect(() => {
        if (isSuccess && !hasAddedConvo.current) {
            if (convos.length > 0) {
                router.push(`/chat/${convos[0].id}`);
            } else {
                hasAddedConvo.current = true; // Prevent further calls
                addConvoMutation();
            }
        }
    }, [isSuccess, convos, router, addConvoMutation]);

    if (isLoading)
        return (
            <div className="h-full w-full flex items-center justify-center ">
                <RippleLoader />
            </div>
        );

    if (error) return <div>Error loading conversations.</div>;

    return (
        <div className="h-full w-full flex items-center justify-center ">
            <RippleLoader />
        </div>
    );
}

export default ChatPageNew;
