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
import { Trash } from "@phosphor-icons/react/dist/ssr";
import { useDeleteNote } from "@/hooks/blocknotes/useDeleteNote";

interface NoteDeleteDialogProps {
    noteId: number;
    blocknoteId: number;
}

export function NoteDeleteDialog({ noteId, blocknoteId }: NoteDeleteDialogProps) {
    const { mutate, isPending } = useDeleteNote();

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
                        Delete note?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-xs">
                        This note will be deleted permanently.
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
                        onClick={() => mutate({ noteId, blocknoteId })}
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
}
