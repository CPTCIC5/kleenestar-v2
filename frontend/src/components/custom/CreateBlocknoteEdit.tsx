"use client";

import * as React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { ImageIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { Input } from "../ui/input";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useTheme } from "next-themes";
import { BlocknotesAccessDialog } from "./BlocknotesAccessDialog";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { DateTimeFormatOptions } from "intl";

interface CreateBlocknoteEditProps {
    note: {
        id: number;
        title: string;
        created_at: string;
        image: string;
    };
    setEmojiPicker: (index: number) => void;
    openEmojiPicker: number;
    isEditing: number;
    setEditing: (index: number) => void;
    fetchBlockNotes: () => Promise<void>;
}

export default function CreateBlocknoteEdit({
    note,
    setEmojiPicker,
    openEmojiPicker,
    isEditing,
    setEditing,
    fetchBlockNotes,
}: CreateBlocknoteEditProps) {
    const { theme } = useTheme();
    function convertDateTime(dateTimeStr: string) {
        const date = new Date(dateTimeStr);
        const options = {
            year: "numeric" as const,
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        };
        return new Intl.DateTimeFormat("en-US", options as DateTimeFormatOptions).format(date);
    }
    const [errors, setErrors] = React.useState("");
    const [selectedEmoji, setSelectedEmoji] = React.useState(null);
    const [title, setTitle] = React.useState("");
    const clearFields = () => {
        setTitle("");
        setSelectedEmoji(null);
    };
    const validateFields = () => {
        if (!title) {
            setErrors("Give a title to the block note");
            return;
        } else {
            setErrors("");
        }
        if (!selectedEmoji) {
            setErrors("Select a Emoji for the block note");
            return;
        } else {
            setErrors("");
        }
    };
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrors("");
        setTitle(e.target?.value);
    };
    const editBlockNotes = async (id: number) => {
        validateFields();
        let configParams: {
            title: string;
            image: string;
        } = {
            title: "",
            image: "",
        };
        if (note.title !== title) {
            configParams["title"] = title;
        }
        if (selectedEmoji !== null && note.image !== selectedEmoji) {
            configParams["image"] = selectedEmoji;
        } else {
            configParams["image"] = note.image;
        }
        if (!errors) {
            try {
                const response = await axios.patch(
                    `/api/channels/blocknotes/${id}/`,
                    configParams,
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                            "X-CSRFToken": Cookies.get("csrftoken"),
                        },
                    },
                );
                console.log(response.data);
                toast.success("Blocknote updated successfully!");
                await fetchBlockNotes();
            } catch (err) {
                console.log(err);
                console.log("error");
                toast.error("Failed to update blocknote");
            }
            clearFields();
        }
    };
    return (
        <Card key={note.id}>
            <CardHeader className="p-3">
                {isEditing === note.id ? (
                    <div>
                        <div className="flex items-center space-x-2">
                            <div
                                onClick={() => {
                                    setEmojiPicker(note.id);
                                    console.log(openEmojiPicker);
                                }}
                                className={cn(
                                    buttonVariants({ variant: "ghost" }),
                                    "p-0 relative ",
                                )}
                            >
                                <Avatar className=" rounded-full w-[40.44px] h-[40.44px]">
                                    <AvatarImage
                                        className="rounded-full border-2 border-muted"
                                        alt="blocknote-image"
                                        src={
                                            selectedEmoji
                                                ? `https://twemoji.maxcdn.com/v/latest/svg/${selectedEmoji}.svg`
                                                : note.image
                                                ? `https://twemoji.maxcdn.com/v/latest/svg/${note.image}.svg`
                                                : "https://github.com/shadcn.png"
                                        }
                                    />
                                </Avatar>
                                {openEmojiPicker === note.id && (
                                    <div className="absolute left-[32px] top-[32px] z-10">
                                        <Picker
                                            theme={theme === "dark" ? "light" : "dark"}
                                            navPosition={"none"}
                                            previewPosition={"none"}
                                            dynamicWidth={true}
                                            data={data}
                                            onEmojiSelect={(emoji:any) => {
                                                setErrors("");
                                                setSelectedEmoji(emoji.unified);
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            <Input
                                type="text"
                                placeholder="Blocknote title…"
                                name="title"
                                value={title}
                                onChange={handleTitleChange}
                                className="border-none bg-muted focus-visible:ring-0"
                            />
                            <Button
                                onClick={() => {
                                    setEditing(note.id);
                                    editBlockNotes(note.id);
                                }}
                                variant={"ghost"}
                            >
                                Save
                            </Button>
                            <Link
                                href="/access"
                                className={cn(buttonVariants({ variant: "outline" }))}
                            >
                                Give access
                            </Link>
                        </div>
                        <div>
                            {errors && (
                                <span className=" text-destructive text-[13px] m-4 pl-8 pt-2">
                                    {" "}
                                    {errors}
                                </span>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center space-x-2">
                        <Avatar className="w-[40.44px] h-[40.44px] relative rounded-full">
                            <AvatarImage
                                className="rounded-full border-2 border-muted"
                                alt="blocknote-image"
                                src={
                                    note.image
                                        ? `https://twemoji.maxcdn.com/v/latest/svg/${note.image}.svg`
                                        : "https://github.com/shadcn.png"
                                }
                            />
                        </Avatar>

                        <div className="flex-1">
                            <CardTitle className="text-[15px]">{note.title}</CardTitle>
                            <CardDescription className="text-[11px]">
                                {`Last modified: ${convertDateTime(note.created_at)}`}
                            </CardDescription>
                        </div>

                        <div
                            onClick={() => setEditing(note.id)}
                            className={cn(
                                buttonVariants({ variant: "ghost" }),
                                " w-[38px] h-[38px] rounded-full p-2",
                            )}
                        >
                            <Pencil2Icon className="h-[20px] w-[20px]" />
                        </div>
                        {/* <BlocknotesAccessDialog /> */}
                    </div>
                )}
            </CardHeader>
        </Card>
    );
}
