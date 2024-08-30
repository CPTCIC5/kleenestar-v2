import React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDeleteBlocknote } from "@/hooks/blocknotes/useDeleteBlocknote";
import { Trash } from "@phosphor-icons/react/dist/ssr";

interface BlocknoteDeleteDialogProps {
    blocknoteId: number;
}

export const BlocknoteDeleteDialog: React.FC<BlocknoteDeleteDialogProps> = ({ blocknoteId }) => {
    const { mutate, isPending } = useDeleteBlocknote();

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="secondary"
                    size="icon"
                    className="size-7 flex items-center justify-center text-destructive bg-destructive/40 hover:bg-destructive/50"
                >
                    <Trash weight="duotone" className="size-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent
                className="max-w-80 w-[calc(100%-1.25rem)] p-4 rounded-xl space-y-3"
                overlayClassName="backdrop-blur-sm"
            >
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-base font-bricolage">
                        Delete Blocknote?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-xs">
                        This blocknote will be deleted permanently.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        className={cn(
                            buttonVariants({ variant: "secondary" }),
                            "w-full text-sm h-full",
                        )}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => mutate(blocknoteId)}
                        disabled={isPending}
                        className={cn(
                            buttonVariants({ variant: "destructive" }),
                            "w-full text-sm h-full",
                        )}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
