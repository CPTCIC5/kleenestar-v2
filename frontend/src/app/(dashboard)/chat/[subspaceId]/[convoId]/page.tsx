"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Icons } from "@/assets/icons";
import { useFetchPrompts } from "@/hooks/useFetchPrompt";
import { useUserData } from "@/hooks/useUserData";
import { useCreatePrompt } from "@/hooks/useCreatePrompt";
import { useChannelsData } from "@/hooks/useChannelsData";
import ChannelIcon from "@/components/custom/ChannelIcon";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatSidebar } from "@/components/custom/ChatSidebar";
import { Card, CardHeader } from "@/components/ui/card";
import { NewChatDisplay } from "@/components/custom/NewChatDisplay";
import PromptItem from "@/components/custom/PromptItem";
import PromptInput from "@/components/custom/PromptInput";
import ShareChatDialog from "@/components/custom/ShareChatDialog";
import NotesSidebar from "@/components/custom/NotesSidebar";
import { Prompt } from "@/lib/types/interfaces";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ChatDisplayPageProps {
    params: {
        convoId: string;
        subspaceId: string;
    };
}

const ChatDisplayPage: React.FC<ChatDisplayPageProps> = ({ params }) => {
    const convoId = Number(params.convoId);
    const subspaceId = Number(params.subspaceId);
    const router = useRouter();
    const queryClient = useQueryClient();

    const { userData } = useUserData();
    const { data: channelsData, isLoading: isChannelsLoading } = useChannelsData(subspaceId);
    const {
        data: fetchedPrompts,
        isLoading: isLoadingPrompts,
        isSuccess: isPromptsSuccess,
    } = useFetchPrompts(convoId);
    const { mutateAsync: createPrompt } = useCreatePrompt();

    const [prompts, setPrompts] = useState<Prompt[]>([]);

    useEffect(() => {
        if (isPromptsSuccess) {
            setPrompts(fetchedPrompts);
        }
    }, [isPromptsSuccess, fetchedPrompts]);

    const sendMessage = async (text: string, file: File | null, fileLink: string | null) => {
        const loadingPrompt: Prompt = {
            id: Date.now(),
            convo: {
                id: convoId,
                title: "Campaign overview",
                archived: false,
            },
            author: "User",
            text_query: text,
            file_query: fileLink,
            response_text: "...",
            response_image: "",
            created_at: new Date().toISOString(),
        };

        setPrompts((oldPrompts) => [...(oldPrompts || []), loadingPrompt]);

        try {
            await createPrompt({ convoId, text, file });
            await queryClient.invalidateQueries({ queryKey: ["prompts", convoId] });
        } catch (error) {
            console.error("Error sending message:", error);
            setPrompts((oldPrompts) =>
                oldPrompts.filter((prompt) => prompt.id !== loadingPrompt.id),
            );
        }
    };

    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [prompts]);

    return (
        <div className="w-full h-full pt-4 px-2 sm:p-4 flex items-center justify-center gap-5">
            <div className="w-full h-full flex flex-col gap-4">
                <div className="w-full h-14 rounded-2xl bg-background py-4 px-5 flex items-center justify-between gap-4">
                    <div className="flex justify-center items-center gap-3">
                        <ChatSidebar subspaceId={subspaceId} className="primary-btn-gradient" />
                        <span className="font-mainhead">
                            {prompts.length === 0 ? "New Chat" : prompts[0].convo.title}
                        </span>
                    </div>
                    <div className="flex justify-center items-center gap-5">
                        <ShareChatDialog prompts={prompts} userData={userData} />
                        <NotesSidebar className="primary-btn-gradient" />
                    </div>
                </div>
                <Card className="h-full w-full bg-inherit overflow-hidden">
                    <CardHeader className="w-full h-full p-4">
                        {prompts.length === 0 ? (
                            <NewChatDisplay />
                        ) : (
                            <ScrollArea
                                className="flex flex-col w-full h-full "
                                ref={chatContainerRef}
                            >
                                <ScrollBar orientation="vertical" />
                                <div className="w-full flex flex-col justify-center gap-6 p-4">
                                    {prompts.map((prompt: Prompt) => (
                                        <PromptItem
                                            key={prompt.id}
                                            prompt={prompt}
                                            userData={userData}
                                        />
                                    ))}
                                </div>
                            </ScrollArea>
                        )}

                        <section className="w-full flex items-center justify-center">
                            <PromptInput onSendMessage={sendMessage} />
                        </section>
                    </CardHeader>
                </Card>
            </div>
            <div className="w-full h-full hidden lg:flex flex-col gap-4 ">
                <Card className="w-full h-full bg-inherit">
                    <CardHeader className="flex justify-center items-center w-full h-full pt-4 gap-4">
                        <div className="w-full flex items-center justify-between gap-4 px-2">
                            <span className="font-mainhead">Chart Title</span>
                            <Button variant={"secondary"} className="h-fit p-1.5 cursor-pointer">
                                <Icons.solarDownloadLine className="w-6 h-6" />
                            </Button>
                        </div>
                        <div className="w-full h-full flex items-center justify-center font-mainhead text-muted-foreground text-5xl text-center bg-background rounded-2xl">
                            Statistics coming soon
                        </div>
                    </CardHeader>
                </Card>
                <div className="w-full h-14 rounded-2xl bg-background py-4 px-5 flex items-center justify-between gap-4">
                    <div
                        onClick={() => router.push(`/channels/${subspaceId}`)}
                        className="w-9 h-9 primary-btn-gradient rounded-full flex items-center justify-center cursor-pointer"
                    >
                        <Icons.solarBoltCircleLine className="w-6 h-6 text-background" />
                    </div>
                    <div className="flex gap-5 items-center justify-start">
                        {isChannelsLoading ? (
                            <div className="flex justify-start items-center gap-5">
                                {Array(5)
                                    .fill(0)
                                    .map((_, index) => (
                                        <Skeleton key={index} className="rounded-full w-7 h-7" />
                                    ))}
                            </div>
                        ) : (
                            <div className="flex justify-start items-center gap-5">
                                {channelsData?.map((channel: { channel_type: number }) => (
                                    <ChannelIcon
                                        key={channel.channel_type}
                                        channelType={channel.channel_type}
                                        className="w-7 h-7"
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatDisplayPage;
