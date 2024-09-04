"use client";

import React from "react";
import { useShallow } from "zustand/react/shallow";
import { newChatOptions } from "@/constants/chat.constants";
import { useAddConvo } from "@/hooks/convo/useAddConvo";
import { toast } from "sonner";
import ChatNavbar from "@/components/custom/navbars/ChatNavbar";
import PromptInput from "@/components/custom/inputs/PromptInput";
import { useChatStore } from "@/providers/stores/ChatStoreProvider";

export default function NewChatPage() {
    const {
        mutate: addConvoMutate,
        isPending: addConvoPending,
        isSuccess: addConvoSuccess,
    } = useAddConvo();

    const {
        initialPromptInputText,
        initialPromptInputFileUrl,
        setInitialPromptInputText,
        setInitialPromptInputFile,
        setInitialPromptInputFileUrl,
    } = useChatStore(
        useShallow((state) => ({
            initialPromptInputText: state.initialPromptInputText,
            initialPromptInputFile: state.initialPromptInputFile,
            initialPromptInputFileUrl: state.initialPromptInputFileUrl,

            setInitialPromptInputText: state.setInitialPromptInputText,
            setInitialPromptInputFile: state.setInitialPromptInputFile,
            setInitialPromptInputFileUrl: state.setInitialPromptInputFileUrl,
        })),
    );

    const handleAddNewChat = async () => {
        if (!initialPromptInputText) toast.error("Please enter your message");
        else addConvoMutate();
    };

    return (
        <div className="flex flex-col items-center w-full h-full p-3">
            <ChatNavbar chatName="New chat" />
            <div className="w-full h-full overflow-hidden">
                {/* ENTER THE FURTHER LOGIC HERE */}
                <div className="flex flex-col items-center w-full h-full p-0 md:p-4">
                    <div className="w-full h-full flex flex-col justify-end items-center pb-5 md:pb-12 space-y-8 max-w-7xl">
                        <h1 className="font-bricolage font-extrabold text-2xl text-muted-foreground text-center">
                            How may I assist you today?
                        </h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4">
                            {newChatOptions.map((option, index) => (
                                <div
                                    key={index}
                                    className="bg-muted p-6 rounded-xl max-w-56 w-full h-full text-sm text-muted-foreground font-bricolage text-center text-balance"
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    </div>
                    <PromptInput
                        promptInputText={initialPromptInputText}
                        promptInputFileUrl={initialPromptInputFileUrl}
                        setPromptInputText={setInitialPromptInputText}
                        setPromptInputFile={setInitialPromptInputFile}
                        setPromptInputFileUrl={setInitialPromptInputFileUrl}
                        handlePromptInputFunction={handleAddNewChat}
                        isDisabled={addConvoPending && !addConvoSuccess}
                    />
                </div>
            </div>
        </div>
    );
}
