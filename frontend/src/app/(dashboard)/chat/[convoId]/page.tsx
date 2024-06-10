"use client";
import { Icons } from "@/assets/icons";
import ChatFeedbackForm from "@/components/custom/ChatFeedbackForm";
import MakeNotes from "@/components/custom/MakeNotes";
import { NewChatDisplay } from "@/components/custom/NewChatDisplay";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import PulsatingDots from "@/components/ui/pulsating-dots";
import { useFetchPrompts } from "@/hooks/useFetchPrompt";
import { useUserData } from "@/hooks/useUserData";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export interface Prompt {
    id: number;
    convo_id: number | null;
    author: string;
    text_query: string;
    file_query: string | null;
    response_text: string;
    response_image: string;
    created_at: string;
}

import { useState, useEffect, useRef } from "react";
import { useCreatePrompt } from "@/hooks/useCreatePrompt";
import Image from "next/image";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useChannelsData } from "@/hooks/useChannelsData";
import ChannelIcon from "@/components/custom/ChannelIcon";
import { Skeleton } from "@/components/ui/skeleton";

function ChatDisplayPage({ params }: { params: { convoId: string } }) {
    const convoId = Number(params.convoId);

    const router = useRouter();

    // Prompt data related work

    const queryClient = useQueryClient();
    const { userData } = useUserData();
    const {
        data: channelsData,
        isLoading: isChannelsLoading,
        isSuccess: isChannelsSuccess,
    } = useChannelsData();
    console.log(channelsData);

    const { data: fetchedPrompts, isLoading, isSuccess } = useFetchPrompts(convoId);
    const { mutateAsync: createPrompt } = useCreatePrompt();

    const [prompts, setPrompts] = React.useState<Prompt[]>([]);

    React.useEffect(() => {
        if (isSuccess) {
            setPrompts(fetchedPrompts);
        }
    }, [isSuccess, fetchedPrompts]);

    const sendMessage = async () => {
        if (!text) {
            toast.warning("Please enter your message");
            return;
        }

        const inputText: string = text;
        setText(""); // Clear the textarea
        resizeTextarea(); // Resize the textarea back to normal

        const loadingPrompt: Prompt = {
            id: Date.now(),
            convo_id: convoId,
            author: "User",
            text_query: inputText,
            file_query: uploadedFileLink,
            response_text: "...",
            response_image: "",
            created_at: new Date().toISOString(),
        };

        // Optimistically update the local state
        queryClient.setQueryData<Prompt[]>(["prompts", convoId], (old) => [
            ...(old || []),
            loadingPrompt,
        ]);

        try {
            await createPrompt({ convoId, text: inputText, file: uploadedFile });
            await queryClient.invalidateQueries({ queryKey: ["prompts", convoId] });
        } catch (error) {
            console.error(error);
            queryClient.setQueryData<Prompt[]>(["prompts", convoId], (old) =>
                old?.filter((p) => p.id !== loadingPrompt.id),
            );
        }
    };

    // File and text upload related functionality

    const [text, setText] = useState("");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [uploadedFileLink, setUploadedFileLink] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setUploadedFile(event.target.files[0]);
            setUploadedFileLink(URL.createObjectURL(event.target.files[0]));
        }
    };

    const handleRemoveFile = () => {
        setUploadedFile(null);
        setUploadedFileLink(null);
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    // Text area && chatcontainer related functioning

    const chatContainerRef = React.useRef<HTMLDivElement>(null);

    // Use effect to scroll to bottom when prompts change
    React.useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [prompts]);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        // Adjust textarea height
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [text]);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevent default behavior of Enter key
            // setText(""); // Clear the textarea
            // resizeTextarea(); // Resize the textarea back to normal
            sendMessage();
        }
    };

    const resizeTextarea = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    return (
        <div className="w-full h-full p-[18px] xlg:pl-2 flex items-center justify-center gap-5">
            <div className="w-full h-full flex-[2] hidden xlg:flex flex-col gap-4">
                <div className="w-full h-14 rounded-2xl bg-background py-4 px-5 flex items-center justify-between gap-4">
                    <div className="flex gap-5 items-center justify-start">
                        {isChannelsLoading ? (
                            <div className="flex justify-start items-center gap-5">
                                <Skeleton className="rounded-full w-7 h-7"/>
                                <Skeleton className="rounded-full w-7 h-7"/>
                                <Skeleton className="rounded-full w-7 h-7"/>
                                <Skeleton className="rounded-full w-7 h-7"/>
                                <Skeleton className="rounded-full w-7 h-7"/>
                            </div>
                        ) : (
                            <div className="flex justify-start items-center gap-5">
                                {channelsData?.map((channel: { channel_type: number }) => {
                                    return (
                                        <ChannelIcon
                                            key={channel.channel_type}
                                            channelType={channel.channel_type}
                                            className="w-7 h-7"
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div
                        onClick={() => router.push("/channels")}
                        className="w-[38px] h-[38px] bg-primary rounded-full flex items-center justify-center cursor-pointer"
                    >
                        <Icons.solarBoltCircleLine className="w-6 h-6 text-background" />
                    </div>
                </div>
                <Card className="w-full h-full bg-inherit">
                    <CardHeader className="flex justify-center items-center w-full h-full">
                        <span className="font-mainhead text-muted-foreground text-5xl text-center">
                            Statistics comming soon
                        </span>
                    </CardHeader>
                </Card>
            </div>
            <div className="w-full h-full flex-[1] max-w-2xl xlg:min-w-[500px] flex flex-col gap-4">
                <div className="w-full h-14 rounded-2xl bg-background py-4 px-5 flex items-center justify-between gap-4">
                    <span className="font-mainhead">Campaign overview</span>
                    <div className="flex gap-5">
                        <div
                            className={cn(
                                buttonVariants({
                                    variant: "ghost",
                                }),
                                "h-fit p-1 cursor-pointer",
                            )}
                        >
                            <Icons.solarArchiveUpLine className="w-6 h-6" />
                        </div>
                        <div
                            className={cn(
                                buttonVariants({
                                    variant: "ghost",
                                }),
                                "h-fit p-1 cursor-pointer",
                            )}
                        >
                            <Icons.solarClipboardLine className="w-6 h-6" />
                        </div>
                    </div>
                </div>
                <Card className="h-full w-full bg-inherit overflow-hidden ">
                    <CardHeader className="w-full h-full p-4 ">
                        <section
                            ref={chatContainerRef}
                            className="w-full h-full overflow-auto scrollbar-thin"
                        >
                            {prompts?.length === 0 ? (
                                <NewChatDisplay />
                            ) : (
                                <div className="w-full flex flex-col justify-center gap-[25px]">
                                    {prompts?.map((prompt: Prompt, index: number) => {
                                        return (
                                            <div
                                                key={prompt.id}
                                                className="flex flex-col gap-[25px]"
                                            >
                                                <div className="flex items-start gap-4">
                                                    <Avatar className="w-9 h-9 rounded-full border-2 border-muted">
                                                        <AvatarImage
                                                            className="rounded-full"
                                                            src={userData?.profile?.avatar}
                                                            alt="@shadcn"
                                                        />
                                                        <AvatarFallback className="flex items-center justify-center">
                                                            {userData?.first_name
                                                                ?.charAt(0)
                                                                .toUpperCase()}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div
                                                        className={cn(
                                                            "markdown-body",
                                                            "!font-inter !bg-transparent",
                                                        )}
                                                    >
                                                        <Markdown remarkPlugins={[remarkGfm]}>
                                                            {prompt?.text_query}
                                                        </Markdown>
                                                    </div>
                                                </div>

                                                <div className="markdown-body w-full p-6 rounded-2xl ">
                                                    {prompt?.response_text === "..." ? (
                                                        <div className="flex  gap-4 items-center">
                                                            <Icons.logoDark className="w-9 h-9  dark:hidden " />
                                                            <Icons.logoLight className="w-9 h-9 hidden dark:block " />
                                                            <PulsatingDots />
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <div className="w-full overflow-auto scrollbar-hide">
                                                                <Markdown
                                                                    remarkPlugins={[remarkGfm]}
                                                                >
                                                                    {prompt?.response_text}
                                                                </Markdown>
                                                            </div>
                                                            <div className="flex gap-3 justify-start items-center">
                                                                <Dialog>
                                                                    <DialogTrigger asChild>
                                                                        <div
                                                                            className={cn(
                                                                                buttonVariants({
                                                                                    variant:
                                                                                        "outline",
                                                                                }),
                                                                                "h-fit p-1 cursor-pointer",
                                                                            )}
                                                                        >
                                                                            <Icons.solarClipboardLine className="w-4 h-4" />
                                                                        </div>
                                                                    </DialogTrigger>
                                                                    <MakeNotes
                                                                        prompt_id={prompt?.id}
                                                                        note={prompt?.response_text}
                                                                    />
                                                                </Dialog>
                                                                <Dialog>
                                                                    <DialogTrigger asChild>
                                                                        <div
                                                                            className={cn(
                                                                                buttonVariants({
                                                                                    variant:
                                                                                        "outline",
                                                                                }),
                                                                                "h-fit p-1 cursor-pointer",
                                                                            )}
                                                                        >
                                                                            <Icons.solarDislikeLine className="w-4 h-4" />
                                                                        </div>
                                                                    </DialogTrigger>
                                                                    <ChatFeedbackForm
                                                                        prompt_id={prompt?.id}
                                                                    />
                                                                </Dialog>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </section>
                        <section className="w-full flex items-center justify-center">
                            <div className="w-full text-base m-auto">
                                <div className="mx-auto flex flex-1 gap-3 text-base md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]">
                                    <div className="w-full">
                                        <div className="relative flex h-full max-w-full flex-1 flex-col">
                                            <div className="flex w-full items-center">
                                                <div className="overflow-hidden flex flex-col w-full flex-grow relative border border-border bg-background text-primary rounded-2xl  border-token-border-medium [&:has(textarea:focus)]:border-muted-foreground/50 [&:has(textarea:focus)]:shadow-[0_2px_6px_rgba(0,0,0,.05)]">
                                                    {uploadedFileLink && (
                                                        <div className="px-2 md:px-4 pt-2.5 w-full h-full overflow-hidden">
                                                            <div className="relative w-14 h-14">
                                                                <Image
                                                                    height={1}
                                                                    width={1}
                                                                    src={uploadedFileLink}
                                                                    alt="uploaded file"
                                                                    className="object-cover w-14 h-14 rounded-lg"
                                                                />
                                                                <button
                                                                    className={cn(
                                                                        buttonVariants({
                                                                            variant: "secondary",
                                                                        }),
                                                                        "absolute top-1 right-1 p-0 h-fit rounded-full justify-center items-center flex",
                                                                    )}
                                                                    onClick={handleRemoveFile}
                                                                >
                                                                    <Icons.solarCrossLine className=" w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}

                                                    <textarea
                                                        id="prompt-textarea"
                                                        tabIndex={0}
                                                        dir="auto"
                                                        rows={1}
                                                        placeholder="Ask Kleenestar"
                                                        className="m-0 w-full resize-none border-0 h-fit bg-transparent dark:bg-transparent focus-visible:border-none focus-visible:outline-none py-3.5 pr-10 md:py-3.5 md:pr-12 max-h-[25dvh]  pl-10 md:pl-[55px] overflow-auto scrollbar-none"
                                                        value={text}
                                                        onChange={(e) => setText(e.target.value)}
                                                        onKeyPress={handleKeyPress}
                                                        ref={textareaRef}
                                                    ></textarea>
                                                    <div className="absolute bottom-2.5 left-2 md:bottom-2.5 md:left-4">
                                                        <div className="flex flex-col">
                                                            <input
                                                                type="file"
                                                                tabIndex={-1}
                                                                ref={fileInputRef}
                                                                className="hidden"
                                                                onChange={handleUploadFileChange}
                                                                accept="image/*"
                                                            />
                                                            <Button
                                                                onClick={handleUploadClick}
                                                                variant="ghost"
                                                                type="button"
                                                                aria-haspopup="menu"
                                                                aria-expanded="false"
                                                                data-state="closed"
                                                                className="inline-flex items-center justify-center gap-1 rounded-lg text-sm  cursor-pointer m-0 h-8 w-8 p-0"
                                                            >
                                                                <Icons.solarGallerySendLine className="h-6 w-6" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        onClick={sendMessage}
                                                        variant="secondary"
                                                        className="absolute bottom-2.5 right-2 md:bottom-2.5 md:right-3 h-8 w-8 bg-muted"
                                                    >
                                                        <span data-state="closed">
                                                            <Icons.solarArrowRightLine className="h-6 w-6" />
                                                        </span>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </CardHeader>
                </Card>
            </div>
        </div>
    );
}

export default ChatDisplayPage;
