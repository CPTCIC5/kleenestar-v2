"use client";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
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
import {
    BackpackIcon,
    DotsHorizontalIcon,
    Pencil2Icon,
    Share2Icon,
    TrashIcon,
} from "@radix-ui/react-icons";
import { Input } from "../ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useDeleteConvo from "@/hooks/useDeleteConvo";
import useRenameConvo from "@/hooks/useRenameConvo";
import React from "react";

interface ChatOptionButtonProps {
    currentConvoId: number | null;
    chat: {
        id: number;
        title: string;
        created_at: string;
    };
    toggleOptions: number | null;
    setToggleOptions: React.Dispatch<React.SetStateAction<number | null>>;
    rename: number | null;
    setRename: React.Dispatch<React.SetStateAction<number | null>>;
    onClick?: () => void;
}

export function ChatOptionButton({
    currentConvoId,
    chat,
    toggleOptions,
    setToggleOptions,
    rename,
    setRename,
    ...otherProps
}: ChatOptionButtonProps) {
    const { mutate: deleteConvo } = useDeleteConvo();
    const { mutate: renameConvo } = useRenameConvo();
    const [newName, setNewName] = React.useState<string>(chat.title);

    const handleDeleteChat = (id: number) => {
        deleteConvo(id);
    };

    const handleRenameChat = (id: number, newName: string) => {
        renameConvo({ id, newName });
    };

    const handleOptions = (id: number) => {
        setToggleOptions((prev) => (prev === id ? null : id));
    };

    const handleRename = (id: number) => {
        setRename((prev) => (prev === id ? null : id));
    };

    return (
        <div
            {...otherProps}
            className={cn(
                buttonVariants({ variant: "ghost" }),
                `relative w-full flex justify-start items-center text=[13px] font-medium group ${
                    toggleOptions === chat.id || currentConvoId === chat.id
                        ? "bg-accent text-accent-foreground"
                        : ""
                }`,
            )}
        >
            {rename === chat.id ? (
                <Input
                    type="text"
                    className="w-full p-0 focus-visible:ring-0 border-none outline-none text-muted-foreground pr-5"
                    placeholder="New title"
                    defaultValue={chat.title}
                    autoFocus
                    onChange={(e) => setNewName(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    onBlur={(e) => {
                        handleRenameChat(chat.id, newName);
                        setRename(null);
                    }} // add the rename api thing also to this
                    onKeyPress={(event) => {
                        if (event.key === "Enter") {
                            event.preventDefault();
                            handleRenameChat(chat.id, newName);
                            setRename(null);
                            // add the rename api thing also to this
                        }
                    }}
                />
            ) : (
                <span className="w-full pr-6 overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {chat.title}
                </span>
            )}

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <DotsHorizontalIcon
                        onClick={() => handleOptions(chat.id)}
                        className={`absolute top-1/2 -translate-y-1/2 right-3 h-4 w-4 group-hover:block  ${
                            toggleOptions === chat.id ? "block" : "hidden"
                        }`}
                    />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    sideOffset={10}
                    align={"start"}
                    alignOffset={50}
                    className="w-full max-w-[166px]"
                >
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleRename(chat.id);
                            setToggleOptions(null);
                        }}
                        variant="ghost"
                        className="flex justify-start gap-2 w-full"
                    >
                        <Pencil2Icon className="h-4 w-4" />
                        <span className="text-[14px] font-normal">Rename</span>
                    </Button>
                    <Button variant="ghost" className="flex justify-start gap-2 w-full">
                        <BackpackIcon className="h-4 w-4" />
                        <span className="text-[14px] font-normal">Add to folder</span>
                    </Button>
                    <Button variant="ghost" className="flex justify-start gap-2 w-full">
                        <Share2Icon className="h-4 w-4" />
                        <span className="text-[14px] font-normal">Share chat</span>
                    </Button>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                onClick={() => setToggleOptions(null)}
                                variant="ghost"
                                className="flex justify-start gap-2 w-full"
                            >
                                <TrashIcon className="h-4 w-4" />
                                <span className="text-[14px] font-normal">Delete</span>
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete this
                                    conversation.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => {
                                        handleDeleteChat(chat.id);
                                    }}
                                >
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
