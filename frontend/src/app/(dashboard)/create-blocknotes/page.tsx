"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CreateBlocknoteEdit from "@/components/ui/CreateBlocknoteEdit";
import { Input } from "@/components/ui/input";
import { blocknotes } from "@/constants/constants";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
    DotsHorizontalIcon,
    ImageIcon,
    InfoCircledIcon,
    PlusCircledIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import * as React from "react";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export default function CreateBlocknotesPage() {
    const [isEditing, setIsEditing] = React.useState<number>(-1);
    console.log(isEditing);
    const [openEmojiPicker, setOpenEmojiPicker] = React.useState<number>(-2);

    const setEditing = (index: number) => {
        if (isEditing === index) {
            setIsEditing(-2);
        } else setIsEditing(index);
    };

    const setEmojiPicker = (index: number) => {
        if (openEmojiPicker === index) {
            setOpenEmojiPicker(-2);
        } else setOpenEmojiPicker(index);
    };
    return (
        <div className="w-full min-h-screen h-full flex items-start justify-center flex-1 bg-muted/40 max-sm:pt-[65px] p-3">
            <div className="max-w-[950px] w-full flex flex-col ">
                <div className="flex gap-2 items-center mb-[16px]">
                    <span className="font-mainhead font-bold text-[18px]">Blocknotes</span>
                    <InfoCircledIcon className="h-[15px] w-[15px]" />
                </div>

                <div className="space-y-4">
                    {blocknotes.map((note) => {
                        return (
                            <CreateBlocknoteEdit
                                isEditing={isEditing}
                                setEditing={setEditing}
                                openEmojiPicker={openEmojiPicker}
                                setEmojiPicker={setEmojiPicker}
                                key={note.id}
                                note={note}
                            />
                        );
                    })}
                </div>

                <Card className="mt-4">
                    <CardHeader className="p-3">
                        <div className="flex items-center space-x-2">
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
                                    <div className="absolute left-[32px] bottom-[32px] z-10">
                                        <Picker
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
                            />
                            <Button variant={"ghost"}>Save</Button>
                            <Link
                                href="/access"
                                className={cn(buttonVariants({ variant: "outline" }))}
                            >
                                Give access
                            </Link>
                        </div>
                    </CardHeader>
                </Card>

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
