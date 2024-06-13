"use client";

import React, { useRef } from "react";
import { Icons } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import useDeleteConvo from "@/hooks/useDeleteConvo";
import useRenameConvo from "@/hooks/useRenameConvo";

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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buttonVariants } from "../ui/button";

interface ChatOptionButtonProps {
    chat: {
        id: number;
        title: string;
        created_at: string;
    };
    onClick?: () => void;
}

export function ChatOptionButton({ chat, ...otherProps }: ChatOptionButtonProps) {
    const pathname = usePathname();
    const isChatRoot = pathname === "/chat/";
    const [currentConvoId, setCurrentConvoId] = React.useState<number | null>(null);

    React.useEffect(() => {
        const chatIdMatch = pathname.match(/^\/chat\/(\d+)\/?$/);
        if (!isChatRoot && chatIdMatch) {
            setCurrentConvoId(parseInt(chatIdMatch[1]));
        }
    }, [pathname, isChatRoot]);

    const { mutate: deleteConvo } = useDeleteConvo();
    const { mutate: renameConvo } = useRenameConvo();
    const [rename, setRename] = React.useState<number | null>(null);
    const [toggleOptions, setToggleOptions] = React.useState<number | null>(null);
    const [newName, setNewName] = React.useState<string>(chat.title);
    const inputRef = useRef<HTMLInputElement>(null); // Create a reference to the input element

    const handleDeleteChat = (id: number) => {
        deleteConvo(id);
    };

    const handleRenameChat = (id: number, newName: string) => {
        console.log("Renaming chat", id, newName);
        renameConvo({ id, newName });
    };

    const handleOptions = (id: number) => {
        setToggleOptions((prev) => (prev === id ? null : id));
    };

    const handleRename = (id: number) => {
        setRename((prev) => (prev === id ? null : id));

        setTimeout(() => {
            inputRef.current?.focus(); // Focus the input element
        }, 250);
    };

    return (
        <div
            {...otherProps}
            className={cn(
                buttonVariants({ variant: "ghost" }),
                `h-10 relative w-full flex justify-start px-2 items-center font-medium group !mt-0 ${
                    currentConvoId === chat.id || toggleOptions === chat.id ? "bg-accent" : ""
                }`,
            )}
        >
            <input
                ref={inputRef} // Attach the reference to the input element
                id="rename-chat"
                type="text"
                className={`w-full p-0 pl-1 mr-8 z-30 ${rename === chat.id ? "block" : "hidden"}`}
                placeholder="New title"
                defaultValue={chat.title}
                onChange={(e) => setNewName(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                onBlur={(e) => {
                    handleRenameChat(chat.id, newName);
                    setRename(null);
                }}
                onKeyPress={(event) => {
                    if (event.key === "Enter") {
                        event.preventDefault();
                        handleRenameChat(chat.id, newName);
                        setRename(null);
                    }
                }}
            />

            <span
                className={`w-full pr-6 pl-1 overflow-hidden whitespace-nowrap overflow-ellipsis ${
                    rename === chat.id ? "hidden" : "block"
                } `}
            >
                {chat.title}
            </span>

            <DropdownMenu
                onOpenChange={() => {
                    handleOptions(chat.id);
                }}
            >
                <DropdownMenuTrigger>
                    <Icons.solarMenuDotsLine
                        className={`absolute top-1/2 -translate-y-1/2 right-3 h-5 w-5 group-hover:block  ${
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
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.stopPropagation();
                            handleRename(chat.id);
                        }}
                    >
                        <Icons.solarPen2Line className="mr-2 h-4 w-4" />
                        <span className="text-[14px] font-normal">Rename</span>
                    </DropdownMenuItem>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Icons.solarBinLine className="mr-2 h-4 w-4" />
                                <span className="text-[14px] font-normal text-orange-600">
                                    Delete
                                </span>
                            </DropdownMenuItem>
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
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteChat(chat.id);
                                    }}
                                    className="bg-destructive"
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
