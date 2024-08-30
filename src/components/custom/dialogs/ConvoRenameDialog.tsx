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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ConvoRenameDialogSchemaTypes } from "@/types/zod.types";
import { ConvoRenameDialogSchema } from "@/lib/zod/schema";
import { SpinnerGap } from "@phosphor-icons/react/dist/ssr";
import { useRenameConvo } from "@/hooks/convo/useRenameConvo";

interface ConvoRenameDialogProps {
    isConvoRenameDialogOpen: boolean;
    setIsConvoRenameDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    oldConvoName: string;
    convoId: number;
}

export const ConvoRenameDialog: React.FC<ConvoRenameDialogProps> = ({
    isConvoRenameDialogOpen,
    setIsConvoRenameDialogOpen,
    oldConvoName,
    convoId,
}) => {
    const form = useForm<ConvoRenameDialogSchemaTypes>({
        resolver: zodResolver(ConvoRenameDialogSchema),
        mode: "onChange",
        defaultValues: {
            newConvoName: oldConvoName,
        },
    });

    const { newConvoName } = form.watch();
    const { mutate, isPending } = useRenameConvo();

    //add mutation to rename the folder name

    const onSubmit = async (data: ConvoRenameDialogSchemaTypes) => {
        mutate({ convoId: convoId, newConvoName: data.newConvoName });
    };

    return (
        <AlertDialog open={isConvoRenameDialogOpen} onOpenChange={setIsConvoRenameDialogOpen}>
            <AlertDialogContent
                className="max-w-80 w-[calc(100%-1.25rem)] p-4 rounded-xl"
                overlayClassName="backdrop-blur-sm"
            >
                <AlertDialogHeader className="space-y-1">
                    <AlertDialogTitle className="text-base font-bricolage">
                        Rename Chat
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-xs">
                        Enter the new name for this chat
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                        <FormField
                            control={form.control}
                            name="newConvoName"
                            render={({ field }) => (
                                <FormItem>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Untitled"
                                        className="bg-secondary text-sm h-full"
                                        disabled={isPending}
                                    />
                                    <FormMessage className="text-xs pl-2" />
                                </FormItem>
                            )}
                        />

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
                                disabled={
                                    Object.keys(form.formState.errors).length > 0 || !newConvoName
                                }
                                type="submit"
                                className={cn(
                                    buttonVariants({ variant: "default" }),
                                    "w-full text-sm h-full flex items-center",
                                )}
                            >
                                {isPending && <SpinnerGap className="mr-2 h-4 w-4 animate-spin" />}
                                Rename
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    );
};
