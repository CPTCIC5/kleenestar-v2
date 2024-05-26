"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CreateBlocknoteEdit from "@/components/custom/CreateBlocknoteEdit";
import { Input } from "@/components/ui/input";
// import { blocknotes } from "@/constants/constants"
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
    ArrowLeftIcon,
    DotsHorizontalIcon,
    ImageIcon,
    InfoCircledIcon,
    PlusCircledIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import * as React from "react";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import { toast } from "sonner";
import { useBlockNotes } from "@/hooks/useBlocknotes";
import { useCreateBlockNote } from "@/hooks/useCreateBlockNotes";

interface BlockNoteTypes {
    id: number;
    image: string;
    created_at: string;
    title: string;
}

export default function CreateBlocknotesPage() {
    const router = useRouter();
    const { theme } = useTheme();
    const { data: blockNotes = [], isLoading } = useBlockNotes();
    const { mutate: createBlockNote } = useCreateBlockNote();

    const [isEditing, setIsEditing] = React.useState<number>(-1);
    const [openEmojiPicker, setOpenEmojiPicker] = React.useState<number>(-2);
    const [errors, setErrors] = React.useState("");
    const [selectedEmoji, setSelectedEmoji] = React.useState<string | null>(null);
    const [title, setTitle] = React.useState<string>("");

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setErrors("");
        setTitle(e.target?.value);
    };

    const setEmojiPicker = (index: number) => {
        if (openEmojiPicker === index) {
            setOpenEmojiPicker(-2);
        } else setOpenEmojiPicker(index);
    };

    const validateFields = () => {
        if (!title) {
            setErrors("Give a title to the block note");
            return false;
        }
        if (!selectedEmoji) {
            setErrors("Select a Emoji for the block note");
            return false;
        }
        return true;
    };

    const handleCreateBlockNote = () => {
        if (validateFields()) {
            createBlockNote(
                { title: title, image: selectedEmoji },
                {
                    onSuccess: () => {
                        toast.success("Block Note Created Successfully!");
                        clearFields();
                        router.back();
                    },
                    onError: () => {
                        toast.error("Failed to create Block Note");
                    },
                },
            );
        }
    };

    const clearFields = () => {
        setTitle("");
        setSelectedEmoji(null);
    };

    return (
        <div className="w-full min-h-screen h-full flex items-start justify-center flex-1 bg-muted/40 pt-[65px] p-3">
            <div className="max-w-[950px] w-full flex flex-col ">
                <div className="mb-[16px]  rounded-full">
                    <div
                        onClick={() => {
                            router.back();
                        }}
                        className={cn(
                            buttonVariants({ variant: "outline" }),
                            "p-0 rounded-full h-full cursor-pointer",
                        )}
                    >
                        <ArrowLeftIcon className=" p-2 rounded-full cursor-pointer h-[30px] w-[30px]" />
                    </div>
                </div>

                <Card>
                    <CardHeader className="p-3">
                        <div className="flex items-center space-x-2">
                            {selectedEmoji ? (
                                <div
                                    onClick={() => {
                                        setEmojiPicker(-1);
                                    }}
                                    className={cn(
                                        buttonVariants({ variant: "ghost" }),
                                        "relative p-0  rounded-full border border-muted ",
                                    )}
                                >
                                    <Avatar className="w-[40.44px] h-[40.44px] relative rounded-full">
                                        <AvatarImage
                                            className="rounded-full border-2 border-muted"
                                            alt="blocknote-image"
                                            src={
                                                selectedEmoji
                                                    ? `https://twemoji.maxcdn.com/v/latest/svg/${selectedEmoji}.svg`
                                                    : "https://github.com/shadcn.png"
                                            }
                                        />
                                    </Avatar>
                                    {openEmojiPicker === -1 && (
                                        <div className="absolute left-[32px] top-[35px] z-10">
                                            <Picker
                                                theme={theme === "dark" ? "light" : "dark"}
                                                navPosition={"none"}
                                                previewPosition={"none"}
                                                dynamicWidth={true}
                                                data={data}
                                                onEmojiSelect={(emoji: any) => {
                                                    setErrors("");
                                                    setSelectedEmoji(emoji.unified);
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div
                                    onClick={() => {
                                        setEmojiPicker(-1);
                                    }}
                                    className={cn(
                                        buttonVariants({ variant: "ghost" }),
                                        "relative w-[38px] h-[38px] rounded-full border border-muted p-2",
                                    )}
                                >
                                    <ImageIcon className="h-[20px] w-[20px]" />
                                    {openEmojiPicker === -1 && (
                                        <div className="absolute left-[32px] top-[35px] z-10">
                                            <Picker
                                                theme={theme === "dark" ? "light" : "dark"}
                                                navPosition={"none"}
                                                previewPosition={"none"}
                                                dynamicWidth={true}
                                                data={data}
                                                onEmojiSelect={(emoji: any) => {
                                                    setErrors("");
                                                    setSelectedEmoji(emoji.unified);
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            <Input
                                type="text"
                                placeholder="Blocknote title…"
                                name="title"
                                value={title}
                                onChange={handleTitleChange}
                                className="border-none bg-muted focus-visible:ring-0"
                            />
                            <Button
                                disabled={!!errors}
                                onClick={handleCreateBlockNote}
                                variant={"ghost"}
                            >
                                Save
                            </Button>
                        </div>
                    </CardHeader>
                </Card>
                <div>
                    {errors && (
                        <span className=" text-destructive text-[13px] m-4 pl-2"> {errors}</span>
                    )}
                </div>
                <div className="flex items-center justify-center h-[360px]">
                    <span className="text-[15px] flex justify-center max-w-[629px] w-full text-center text-muted-foreground">
                        Create notes from your chat with AI and share them with your team members to
                        promote productivity and collaboration.
                    </span>
                </div>
            </div>
        </div>
    );
}
