import React from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SpinnerGap } from "@phosphor-icons/react/dist/ssr";
import { Label } from "@/components/ui/label";
import { useCreateBlocknote } from "@/hooks/blocknotes/useCreateBlocknote";
import { EmojiPicker } from "../picker/EmojiPicker";
import { Textarea } from "@/components/ui/textarea";
import { useCreateKnowledgeSource } from "@/hooks/knowledge-base/useCreateKnowledgeSource";

interface KnowledgeSourceCreateDialogProps {
    isKnowledgeSourceCreateDialogOpen: boolean;
    setIsKnowledgeSourceCreateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function KnowledgeSourceCreateDialog({
    isKnowledgeSourceCreateDialogOpen,
    setIsKnowledgeSourceCreateDialogOpen,
}: KnowledgeSourceCreateDialogProps) {
    const [knowledgeSourceTitle, setKnowledgeSourceTitle] = React.useState<string>("");
    const [knowledgeSourceText, setKnowledgeSourceText] = React.useState<string>("");

    const { mutate: createKnowledgeSourceMutate, isPending: createKnowledgeSourcePending } =
        useCreateKnowledgeSource();

    const onSubmit = async () => {
        if (!knowledgeSourceText) return;
        createKnowledgeSourceMutate({ knowledgeSourceTitle, knowledgeSourceText });
        setKnowledgeSourceTitle("");
        setIsKnowledgeSourceCreateDialogOpen(false);
    };

    return (
        <Dialog
            open={isKnowledgeSourceCreateDialogOpen}
            onOpenChange={setIsKnowledgeSourceCreateDialogOpen}
        >
            <DialogContent
                className="w-[calc(100%-0.75rem)] p-2 xs:p-4 rounded-xl"
                overlayClassName="backdrop-blur-sm"
            >
                <DialogHeader className="space-y-1">
                    <DialogTitle className="text-base font-bricolage">
                        Create knowledge source
                    </DialogTitle>
                    <DialogDescription className="text-xs">
                        Provide details that you want to save as a knowledge source
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <Label>Title</Label>

                        <Input
                            type="text"
                            placeholder="Knowledge source title"
                            name="title"
                            value={knowledgeSourceTitle}
                            maxLength={50}
                            onChange={(e) => setKnowledgeSourceTitle(e.target.value)}
                            className="bg-secondary"
                        />
                        {!knowledgeSourceTitle && (
                            <div className="text-destructive text-xs font-medium w-full">
                                Source title is required
                            </div>
                        )}
                    </div>

                    <div className="space-y-3">
                        <Label>Detail</Label>
                        <Textarea
                            name="knowledgeSourceDetail"
                            value={knowledgeSourceText}
                            maxLength={700}
                            onChange={(e) => setKnowledgeSourceText(e.target.value)}
                            placeholder="write your knowledge source details here"
                            className={`resize-none h-52 bg-secondary`}
                        />
                        {!knowledgeSourceText && (
                            <div className="text-destructive text-xs font-medium w-full">
                                Source detail is required
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose
                        type="submit"
                        disabled={!knowledgeSourceTitle || !knowledgeSourceText}
                        className={cn(buttonVariants({ variant: "default" }))}
                        onClick={onSubmit}
                    >
                        {createKnowledgeSourcePending && (
                            <SpinnerGap className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Create
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
