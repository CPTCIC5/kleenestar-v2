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

interface BlocknoteCreateDialogProps {
    isBlocknoteCreateDialogOpen: boolean;
    setIsBlocknoteCreateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BlocknoteCreateDialog: React.FC<BlocknoteCreateDialogProps> = ({
    isBlocknoteCreateDialogOpen,
    setIsBlocknoteCreateDialogOpen,
}) => {
    const [blocknoteIcon, setBlocknoteIcon] = React.useState<string | null>(null);
    const [blocknoteTitle, setBlocknoteTitle] = React.useState<string>("");

    const { mutate: createBlocknoteMutate, isPending: createBlocknotePending } =
        useCreateBlocknote();

    const onSubmit = async () => {
        if (!blocknoteIcon || !blocknoteTitle) return;
        createBlocknoteMutate({ blocknoteTitle, blocknoteIcon });
        setBlocknoteIcon(null);
        setBlocknoteTitle("");
        setIsBlocknoteCreateDialogOpen(false);
    };

    return (
        <Dialog open={isBlocknoteCreateDialogOpen} onOpenChange={setIsBlocknoteCreateDialogOpen}>
            <DialogContent
                className="w-[calc(100%-0.75rem)] p-2 xs:p-4 rounded-xl"
                overlayClassName="backdrop-blur-sm"
            >
                <DialogHeader className="space-y-1">
                    <DialogTitle className="text-base font-bricolage">Create Blocknote</DialogTitle>
                    <DialogDescription className="text-xs">
                        Pick a icon and a name for the blocknote
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
                        {createBlocknotePending && (
                            <SpinnerGap className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Create
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
