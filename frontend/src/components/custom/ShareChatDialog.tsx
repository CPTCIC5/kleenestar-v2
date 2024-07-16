import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Button, buttonVariants } from "../ui/button";
import { Icons } from "@/assets/icons";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { useAdditionalFeedback } from "@/hooks/useAdditionalFeedback";
import { Card, CardContent, CardHeader } from "../ui/card";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useCreateNote } from "@/hooks/useCreateNote";
import { useBlockNotes } from "@/hooks/useBlocknotes";

interface ShareChatDialogProps {
    prompts: Prompt[];
    userData: any;
}

export interface Prompt {
    id: number;
    convo: {
        id: number;
        title: string;
        archived: boolean;
    };
    author: string;
    text_query: string;
    file_query: string | null;
    response_text: string;
    response_image: string;
    created_at: string;
}

const ShareChatDialog = ({ prompts, userData }: ShareChatDialogProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant={"secondary"}
                    disabled={prompts.length === 0}
                    className="h-fit p-1.5 cursor-pointer"
                >
                    <Icons.solarArchiveUpLine className="w-6 h-6" />
                </Button>
            </DialogTrigger>
            <DialogContent
                className="rounded-xl sm:rounded-2xl w-[calc(100%-1.25rem)] max-w-2xl"
                overlayClassName="backdrop-blur-sm"
            >
                <DialogHeader className="mt-4 sm:mt-0">
                    <DialogTitle className="font-mainhead text-lg ">Share link to chat</DialogTitle>
                    <DialogDescription>
                        Messages you send after creating your link won’t be shared. Anyone with the
                        URL in this workspace will be able to view the shared chat.
                    </DialogDescription>
                </DialogHeader>
                <Card className="h-96 w-full bg-muted/60 overflow-hidden ">
                    <CardHeader className="w-full h-full p-4 overflow-auto scrollbar-thin ">
                        <section className="w-full h-full ">
                            <div className="w-full flex flex-col justify-center gap-[25px] pb-6 ">
                                {prompts?.map((prompt: Prompt, index: number) => {
                                    return (
                                        <div key={prompt.id} className="flex flex-col gap-[25px]">
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
                                                        "!font-inter !bg-transparent !text-sm ",
                                                    )}
                                                >
                                                    <Markdown remarkPlugins={[remarkGfm]}>
                                                        {prompt?.text_query}
                                                    </Markdown>
                                                </div>
                                            </div>

                                            <div className="markdown-body w-full p-6 rounded-2xl bg-background ">
                                                <div>
                                                    <div className="w-full overflow-auto scrollbar-hide !text-sm">
                                                        <Markdown remarkPlugins={[remarkGfm]}>
                                                            {prompt?.response_text}
                                                        </Markdown>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    </CardHeader>
                </Card>
                <DialogFooter className="flex flex-row !justify-between items-center">
                    <div></div>
                    <Button
                        type="submit"
                        className="px-4 py-5 rounded-xl flex items-center justify-center"
                    >
                        <Icons.solarLinkLine className="w-5 h-5 mr-2" />
                        <span>Copy link</span>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ShareChatDialog;
