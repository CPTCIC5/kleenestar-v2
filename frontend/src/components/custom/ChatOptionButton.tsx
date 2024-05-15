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
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/custom/CustomDropdown";
import React from "react";
import useChatStore from "@/lib/store/ConvoStore";
import axios from "axios";
import Cookies from "js-cookie";

interface ChatOptionButtonProps {
    currentConvoId: number;
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
    const convos = useChatStore((state) => state.convos);
    const renameConvo = useChatStore((state) => state.renameConvo);
    const deleteConvo = useChatStore((state) => state.deleteConvo);
    const [newName, setNewName] = React.useState<string>("");

    const handleDeleteChat = async (id: number) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/channels/convos/${id}/`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": Cookies.get("csrftoken"),
                },
            });
            deleteConvo(id);
        } catch (err) {
            console.error("Error deleting chat", err);
        }
    };

    const handleRenameChat = async (id: number, newName: string) => {
        try {
            await axios.patch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/channels/convos/${id}/`,
                {
                    title: newName,
                },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": Cookies.get("csrftoken"),
                    },
                },
            );
            console.log(currentConvoId, id, newName);

            renameConvo(id, newName);
            console.log(convos);
        } catch (error) {
            console.error(error);
        }
    };

    const handleOptions = (id: number) => {
        if (toggleOptions === id) {
            setToggleOptions(null);
        } else {
            setToggleOptions(id);
        }
    };

    const handleRename = (id: number) => {
        if (rename === id) {
            setRename(null);
        } else {
            setRename(id);
        }
    };

    return (
        <div
            {...otherProps}
            key={chat.id}
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
            {/* <TryDropDown /> */}

            {/* <Card
                className={`absolute bottom-[10px] right-[10px] z-[100] translate-x-full translate-y-full ${
                    toggleOptions === chat.id ? "block" : "hidden"
                }`}
            >
                <CardContent className="flex flex-col p-0 z-[100]">
                    <Button
                        onClick={() => {
                            handleRename(chat.id);
                            setToggleOptions(null);
                        }}
                        variant="ghost"
                        className="flex justify-start gap-2"
                    >
                        <Pencil2Icon className="h-4 w-4" />
                        <span className="text-[14px] font-normal">Rename</span>
                    </Button>
                    <Button variant="ghost" className="flex justify-start gap-2">
                        <BackpackIcon className="h-4 w-4" />
                        <span className="text-[14px] font-normal">Add to folder</span>
                    </Button>
                    <Button variant="ghost" className="flex justify-start gap-2">
                        <Share2Icon className="h-4 w-4" />
                        <span className="text-[14px] font-normal">Share chat</span>
                    </Button>
                    <Button variant="ghost" className="flex justify-start gap-2">
                        <TrashIcon className="h-4 w-4" />
                        <span className="text-[14px] font-normal">Delete</span>
                    </Button>
                </CardContent>
            </Card> */}

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <DotsHorizontalIcon
                        onClick={() => handleOptions(chat.id)}
                        className={`absolute top-1/2 -translate-y-1/2 right-3 h-4 w-4 group-hover:block  ${
                            toggleOptions === chat.id ? "block" : "hidden"
                        }`}
                    />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full max-w-[166px]">
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
