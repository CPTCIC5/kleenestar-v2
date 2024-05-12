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
import axios, { AxiosError } from "axios"
import { toast } from "sonner"
import Cookies from "js-cookie"


interface CreateBlocknoteEditProps {
    note: {
        id: number;
        title: string;
        last_modified: string;
    };
    setEmojiPicker: (index: number) => void;
    openEmojiPicker: number;
    isEditing: number;
    setEditing: (index: number) => void;
}

export default function CreateBlocknoteEdit({
    note,
    setEmojiPicker,
    openEmojiPicker,
    isEditing,
    setEditing,
}: CreateBlocknoteEditProps) {
    const { theme } = useTheme();

    return (
        <Card key={note.id}>
            <CardHeader className="p-3">
                {isEditing === note.id ? (
                    <div className="flex items-center space-x-2">
                        <div
                            onClick={() => {
                                setEmojiPicker(note.id);
                                console.log(openEmojiPicker);
                            }}
                            className={cn(
                                buttonVariants({ variant: "ghost" }),
                                "relative w-[38px] h-[38px] rounded-full border border-muted p-2",
                            )}
                        >
                            <ImageIcon className="h-[20px] w-[20px]" />

                            {openEmojiPicker === note.id && (
                                <div className="absolute left-[32px] top-[32px] z-10">
                                    <Picker
                                        theme={theme === "dark" ? "light" : "dark"}
                                        navPosition={"none"}
                                        previewPosition={"none"}
                                        dynamicWidth={true}
                                        data={data}
                                        onEmojiSelect={console.log(data)}
                                    />
                                </div>
                            )}
                        </div>

                        <Input
                            type="text"
                            placeholder="Blocknote title…"
                            className="border-none bg-muted focus-visible:ring-0"
                            value={note.title}
                        />
                        <Button onClick={() => setEditing(note.id)} variant={"ghost"}>
                            Save
                        </Button>
                        <Link href="/access" className={cn(buttonVariants({ variant: "outline" }))}>
                            Give access
                        </Link>
                    </div>
                ) : (
                    <div className="flex items-center space-x-2">
                        <Avatar className="w-[38px] h-[38px]  rounded-full ">
                            <AvatarImage
                                className="rounded-full border-2 border-muted"
                                src="https://github.com/shadcn.png"
                                alt="@shadcn"
                            />
                            <AvatarFallback className="flex items-center justify-center">
                                N
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                            <CardTitle className="text-[15px]">{note.title}</CardTitle>
                            <CardDescription className="text-[11px]">
                                {`Last modified: ${note.last_modified}`}
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
                        <BlocknotesAccessDialog />
                    </div>
                )}
            </CardHeader>
        </Card>
    );
}
