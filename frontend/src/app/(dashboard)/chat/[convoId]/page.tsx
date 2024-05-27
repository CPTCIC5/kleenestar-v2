"use client";

import { ClipboardList, ThumbsDown, X } from "lucide-react";
import * as React from "react";
import { NewChatDisplay } from "@/components/custom/NewChatDisplay";
import { Avatar, AvatarFallback, AvatarImage } from "@/components//ui/avatar";
import { Icons } from "@/assets/icons";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Dialog, DialogTrigger } from "@/components//ui/dialog";
import MakeNotes from "@/components/custom/MakeNotes";
import ChatFeedbackForm from "@/components/custom/ChatFeedbackForm";
import { Card, CardHeader } from "@/components/ui/card";
import { CrossCircledIcon, PaperPlaneIcon, UploadIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Image from "next/image";
import PulsatingDots from "@/components/ui/pulsating-dots";
import { useRouter } from "next/router";
import { useFetchPrompts } from "@/hooks/useFetchPrompt";
import { useCreatePrompt } from "@/hooks/useCreatePrompt";
import { useQueryClient } from "@tanstack/react-query";
import { useUserData } from "@/hooks/useUserData";
import "../../../../assets/github-markdown.css";

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

function ChatDisplayPage({ params }: { params: { convoId: string } }) {
    const convoId = Number(params.convoId);

    const { userData } = useUserData();

    const [text, setText] = React.useState("");
    const [uploadedFiles, setUploadedFiles] = React.useState<string | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const queryClient = useQueryClient();
    const { data: prompts, isLoading } = useFetchPrompts(convoId);
    const { mutateAsync: createPrompt } = useCreatePrompt();

    const handleUploadFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setUploadedFiles(URL.createObjectURL(event.target.files[0]));
        }
    };

    const handleRemoveFile = () => {
        setUploadedFiles(null);
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const sendMessage = async () => {
        if (!text) {
            toast.warning("Please enter your message");
            return;
        }

        const inputText: string = text;
        setText("");

        const tempPrompt: Prompt = {
            id: Date.now(), // Temporarily use current timestamp as ID
            convo_id: convoId,
            author: "User",
            text_query: inputText,
            file_query: uploadedFiles,
            response_text: "thinking...",
            response_image: "",
            created_at: new Date().toISOString(),
        };

        // Optimistically update the local state
        queryClient.setQueryData<Prompt[]>(["prompts", convoId], (old) => [
            ...(old || []),
            tempPrompt,
        ]);

        try {
            await createPrompt({ convoId, text: inputText, file: uploadedFiles });
            await queryClient.invalidateQueries({ queryKey: ["prompts", convoId] });
        } catch (error) {
            console.error(error);
            // If error, revert back the optimistic update
            queryClient.setQueryData<Prompt[]>(["prompts", convoId], (old) =>
                old?.filter((p) => p.id !== tempPrompt.id),
            );
        }
    };

    const chatContainerRef = React.useRef<HTMLDivElement>(null);

    // Use effect to scroll to bottom when prompts change
    React.useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [prompts]);

    React.useEffect(() => {
        if (!convoId) return;
    }, [convoId]);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className=" w-full h-full pt-[10px] sm:pt-[69px] flex flex-col relative justify-between flex-1">
            <section
                ref={chatContainerRef}
                className="w-full h-full flex flex-col items-center px-[8px] overflow-auto large-scrollbar"
            >
                <div className="max-w-[670.68px] w-full h-full  ">
                    {prompts?.length === 0 ? (
                        <NewChatDisplay />
                    ) : (
                        <div className="w-full flex flex-col justify-center gap-[25px]">
                            {prompts?.map((item: Prompt, index: number) => {
                                return (
                                    <div key={index} className="flex flex-col gap-[25px]">
                                        <div className="flex items-start gap-[23.68px] pr-[24px]">
                                            <Avatar className="w-[35px] h-[35px] rounded-full ">
                                                <AvatarImage
                                                    className="rounded-full border-2 border-muted"
                                                    src={userData?.profile?.avatar}
                                                    alt="@shadcn"
                                                />
                                                <AvatarFallback className="flex items-center justify-center">
                                                    {userData?.first_name?.charAt(0).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className=" text-[16px]">{item?.text_query}</span>
                                        </div>

                                        <div
                                            className={`bg-[#0d1117] p-[24px] w-full flex  gap-[23.68px] rounded-3xl ${
                                                item?.response_text === "thinking..."
                                                    ? "items-center"
                                                    : "items-start"
                                            }`}
                                        >
                                            {item?.response_text === "thinking..." ? (
                                                <div>
                                                    <Icons.logoDark className="w-[30px] h-[30px]" />
                                                </div>
                                            ) : null}

                                            <div className="space-y-4 w-full">
                                                {item?.response_text === "thinking..." ? (
                                                    <span className="flex text-[16px] leading-[19.5px] justify-start">
                                                        <PulsatingDots />
                                                    </span>
                                                ) : (
                                                    <div className="w-full markdown-body overflow-auto scrollbar-hide">
                                                        <Markdown remarkPlugins={[remarkGfm]}>
                                                            {item?.response_text}
                                                        </Markdown>
                                                    </div>
                                                )}
                                                {/* <span className=" text-[16px] leading-[19.5px]">
                                                    {item?.response_text === "thinking..." ? (
                                                        <PulsatingDots />
                                                    ) : (
                                                        <div className="markdown-body overflow-auto scrollbar-hide">
                                                            <Markdown remarkPlugins={[remarkGfm]}>
                                                                {item?.response_text}
                                                            </Markdown>
                                                        </div>
                                                    )}
                                                </span> */}
                                                {item?.response_text !== "thinking..." ? (
                                                    <div className="flex gap-[15px] justify-start items-center">
                                                        <div>
                                                            <Dialog>
                                                                <DialogTrigger asChild>
                                                                    <div
                                                                        className={cn(
                                                                            buttonVariants({
                                                                                variant: "ghost",
                                                                            }),
                                                                            "h-fit p-1",
                                                                        )}
                                                                    >
                                                                        <ClipboardList className="w-[18px] h-[18px]" />
                                                                    </div>
                                                                </DialogTrigger>
                                                                <MakeNotes
                                                                    id={item?.id}
                                                                    note={item?.response_text}
                                                                />
                                                            </Dialog>
                                                        </div>
                                                        <div>
                                                            <Dialog>
                                                                <DialogTrigger asChild>
                                                                    <div
                                                                        className={cn(
                                                                            buttonVariants({
                                                                                variant: "ghost",
                                                                            }),
                                                                            "h-fit p-1",
                                                                        )}
                                                                    >
                                                                        <ThumbsDown className="w-[18px] h-[18px]" />
                                                                    </div>
                                                                </DialogTrigger>
                                                                <ChatFeedbackForm
                                                                    prompt_id={convoId}
                                                                />
                                                            </Dialog>
                                                        </div>
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            <div className="w-full flex flex-col gap-[16.39px] items-center p-[16px] pt-[6px]">
                <Card
                    className="relative flex flex-col justify-center item-center max-w-[672px] w-full h-full min-h-[52px]
                "
                >
                    <CardHeader className="p-0">
                        {uploadedFiles && (
                            <div className="px-[15.02px] py-[12.26px] w-[200px] h-[150px] overflow-hidden">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={uploadedFiles}
                                        alt="uploaded file"
                                        className="object-cover w-full h-full rounded-2xl"
                                    />
                                    <button
                                        className={cn(
                                            buttonVariants({ variant: "outline" }),
                                            "absolute top-2 right-2 p-0 h-fit rounded-full justify-center items-center flex",
                                        )}
                                        onClick={handleRemoveFile}
                                    >
                                        <CrossCircledIcon className=" w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}
                        {uploadedFiles && (
                            <div className="pb-3">
                                <Separator className="w-[95%] mx-auto" />
                            </div>
                        )}
                        <div className="flex items-center w-full py-2">
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onInput={(e) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    target.style.height = "auto";
                                    target.style.height = target.scrollHeight + "px";
                                }}
                                rows={1}
                                className="my-0 py-0 w-full px-14  text-[16px] leading-[19.5px] resize-none outline-none overflow-y-auto max-h-[150px] text-muted-foreground bg-inherit small-scrollbar"
                                placeholder="Type here..."
                                onKeyPress={handleKeyPress}
                            />
                        </div>
                        <div
                            onClick={sendMessage}
                            className="absolute bottom-[6px] right-3 flex items-center  p-2 rounded-full  cursor-pointer"
                        >
                            <PaperPlaneIcon className="h-[20px] w-[20px]" />
                        </div>
                        <div className="absolute bottom-[0px] left-4 transform -translate-y-1/2 bg-inherit text-primary-300 flex items-center  cursor-pointer">
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={handleUploadFileChange}
                                accept="image/*"
                            />
                            <button
                                className={cn(
                                    buttonVariants({ variant: "outline" }),
                                    "p-[2px] h-fit",
                                )}
                                onClick={handleUploadClick}
                            >
                                <UploadIcon className=" h-[20px] w-[20px]" />
                            </button>
                        </div>
                    </CardHeader>
                </Card>
                <span className="max-w-[402px] w-full text-[11px]  text-muted-foreground text-center">
                    KleeneStar can make mistakes. Consider checking important information.
                </span>
            </div>
        </div>
    );
}

export default ChatDisplayPage;
