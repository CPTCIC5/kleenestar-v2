import React from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { PencilSimple, SpinnerGap } from "@phosphor-icons/react/dist/ssr";
import { Label } from "@/components/ui/label";
import { useCreateBlocknote } from "@/hooks/blocknotes/useCreateBlocknote";
import { EmojiPicker } from "../picker/EmojiPicker";
import { useUpdateBlocknote } from "@/hooks/blocknotes/useUpdateBlocknote";

interface BlocknoteEditDialogProps {
    blocknote: Blocknote;
}

export function BlocknoteEditDialog({ blocknote }: BlocknoteEditDialogProps) {
    const [blocknoteIcon, setBlocknoteIcon] = React.useState<string | null>(blocknote.image);
    const [blocknoteTitle, setBlocknoteTitle] = React.useState<string>(blocknote.title);

    const { mutate: updateBlocknoteMutate, isPending: updateBlocknotePending } =
        useUpdateBlocknote();

    const onSubmit = async () => {
        if (!blocknoteIcon || !blocknoteTitle) return;
        updateBlocknoteMutate({ blocknoteId: blocknote.id, blocknoteTitle, blocknoteIcon });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="secondary"
                    size="icon"
                    className="size-7 text-primary bg-primary/40 hover:bg-primary/50"
                >
                    <PencilSimple weight="duotone" className="size-4" />
                </Button>
            </DialogTrigger>
            <DialogContent
                className="w-[calc(100%-0.75rem)] p-2 xs:p-4 rounded-xl"
                overlayClassName="backdrop-blur-sm"
            >
                <DialogHeader className="space-y-1">
                    <DialogTitle className="text-base font-bricolage">Edit Blocknote</DialogTitle>
                    <DialogDescription className="text-xs">
                        Pick new icon and new name for the blocknote
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <Label>Blocknote icon</Label>
                        <div className="flex flex-col md:flex-row gap-3 items-start justify-between">
                            <div>
                                <div className="rounded-xl border border-border size-24 flex items-center justify-center">
                                    <span className="text-6xl">
                                        {blocknoteIcon ? blocknoteIcon : "❔"}
                                    </span>
                                </div>
                            </div>
                            <div className="w-full">
                                <EmojiPicker onSelect={(value) => setBlocknoteIcon(value)} />
                            </div>
                        </div>
                        {!blocknoteIcon && (
                            <div className="text-destructive text-xs font-medium w-full ">
                                Blocknote icon is required
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Blocknote title</Label>
                        <Input
                            type="text"
                            placeholder="Blocknote title…"
                            name="title"
                            value={blocknoteTitle}
                            onChange={(e) => setBlocknoteTitle(e.target.value)}
                            disabled={updateBlocknotePending}
                            className="bg-secondary"
                        />
                        {!blocknoteTitle && (
                            <div className="text-destructive text-xs font-medium w-full">
                                Blocknote title is required
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose
                        type="submit"
                        disabled={!blocknoteIcon || !blocknoteTitle}
                        className={cn(buttonVariants({ variant: "default" }))}
                        onClick={onSubmit}
                    >
                        {updateBlocknotePending && (
                            <SpinnerGap className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Update
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
