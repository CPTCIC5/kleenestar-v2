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
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDeleteConvo } from "@/hooks/convo/useDeleteConvos";

interface ConvoDeleteDialogProps {
    isConvoDeleteDialogOpen: boolean;
    setIsConvoDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    convoId: number;
}

export const ConvoDeleteDialog: React.FC<ConvoDeleteDialogProps> = ({
    isConvoDeleteDialogOpen,
    setIsConvoDeleteDialogOpen,
    convoId,
}) => {
    const { mutate, isPending } = useDeleteConvo();

    return (
        <AlertDialog open={isConvoDeleteDialogOpen} onOpenChange={setIsConvoDeleteDialogOpen}>
            <AlertDialogContent
                className="max-w-80 w-[calc(100%-1.25rem)] p-4 rounded-xl space-y-3"
                overlayClassName="backdrop-blur-sm"
            >
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-base font-bricolage">
                        Delete Convo?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-xs">
                        This conversation will be deleted permanently.
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
                        onClick={() => mutate(convoId)}
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
