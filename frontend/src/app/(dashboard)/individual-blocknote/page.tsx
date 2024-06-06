"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import CreateBlocknoteEdit from "@/components/custom/CreateBlocknoteEdit";
import { Input } from "@/components/ui/input";
import { blocknotes, notes } from "@/constants/constants";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
    ArrowLeftIcon,
    DotsHorizontalIcon,
    ImageIcon,
    InfoCircledIcon,
    Pencil2Icon,
    PlusCircledIcon,
    TrashIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import * as React from "react";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import Image from "next/image";
import landscapeImg from "@/assets/images/landscape.png";
import portraitImg from "@/assets/images/portrait.jpg";
import { MessageCircleMore } from "lucide-react";

export default function IndividualBlocknotesPage() {
    const router = useRouter();
    const note = blocknotes;

    const [isEditing, setIsEditing] = React.useState<number>(-1);
    console.log(isEditing);
    const [isNoteEditing, setIsNoteEditing] = React.useState<number>(-1);

    const setEditing = (index: number) => {
        if (isEditing === index) {
            setIsEditing(-2);
        } else setIsEditing(index);
    };

    return (
        <div className="w-full min-h-screen h-full flex items-start justify-center flex-1 bg-muted/40 max-sm:pt-[65px] p-3">
            <div className="max-w-[950px] w-full flex flex-col ">
                <div className="mb-[16px] rounded-full">
                    <div
                        onClick={() => {
                            router.back();
                        }}
                        className={cn(
                            buttonVariants({ variant: "outline" }),
                            "p-0 rounded-full h-full cursor-pointer",
                        )}
                    >
                        <ArrowLeftIcon className=" p-2 rounded-full h-[30px] w-[30px]" />
                    </div>
                </div>

                <div className="space-y-4">
                    <Card>
                        <CardHeader className="p-3">
                            <div className="flex items-center space-x-2">
                                <Avatar className="w-[40.44px] h-[40.44px] relative rounded-full">
                                    <AvatarImage
                                        className="rounded-full border-2 border-muted"
                                        alt="blocknote-image"
                                        src={"https://github.com/shadcn.png"}
                                    />
                                </Avatar>

                                <div className="flex-1">
                                    <CardTitle className="text-[15px]">
                                        Tristan&apos;s notes
                                    </CardTitle>
                                    <CardDescription className="text-[11px]">
                                        Last modified: 15/4/2024, 12:12:45 PM
                                    </CardDescription>
                                </div>

                                <Button
                                    onClick={() => setEditing(-1)}
                                    variant={"ghost"}
                                    className="p-1 rounded-full h-full"
                                >
                                    <Pencil2Icon className="w-[20px] h-[20px]" />
                                </Button>
                            </div>
                        </CardHeader>
                    </Card>
                </div>

                <div className="w-full grid  grid-cols-1 md:grid-cols-2 gap-4 mx-auto mt-4 items-start ">
                    {notes.map((note) => {
                        return (
                            <Card key={note.id}>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardDescription>{note.date}</CardDescription>
                                    {isNoteEditing !== note.id ? (
                                        <div className="flex space-x-3 items-center">
                                            <div
                                                onClick={() => setEditing(note.id)}
                                                className={cn(
                                                    buttonVariants({ variant: "ghost" }),
                                                    " w-[38px] h-[38px] rounded-full p-2",
                                                )}
                                            >
                                                <Pencil2Icon className="h-[20px] w-[20px]" />
                                            </div>
                                            <div
                                                className={cn(
                                                    buttonVariants({ variant: "ghost" }),
                                                    " w-[38px] h-[38px] rounded-full p-2",
                                                )}
                                            >
                                                <TrashIcon className="h-[20px] w-[20px]" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex space-x-3 items-center">
                                            <div
                                                className={cn(
                                                    buttonVariants({ variant: "ghost" }),
                                                    " w-[38px] h-[38px] rounded-full p-2",
                                                )}
                                            >
                                                <TrashIcon className="h-[20px] w-[20px]" />
                                            </div>
                                            <Button
                                                onClick={() => setEditing(note.id)}
                                                variant={"ghost"}
                                            >
                                                Save
                                            </Button>
                                        </div>
                                    )}
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div
                                        style={{ backgroundColor: note.color }}
                                        className="rounded-xl p-3"
                                    >
                                        {note.note}
                                    </div>
                                    <div>
                                        <Image
                                            src={landscapeImg}
                                            alt="img"
                                            className="rounded-2xl max-h-[300px] "
                                        />
                                    </div>

                                    <div>{note.response_query}</div>
                                </CardContent>
                                <CardFooter>
                                    <div className="flex flex-row justify-between items-center rounded-xl bg-muted w-full p-1">
                                        <CardTitle className="pl-1">{note.title}</CardTitle>
                                        <Link
                                            href={`/chat`}
                                            className={cn(
                                                buttonVariants({ variant: "ghost" }),
                                                " w-[38px] h-[38px] rounded-full p-2",
                                            )}
                                        >
                                            <MessageCircleMore className="h-[25px] w-[25px]" />
                                        </Link>
                                    </div>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
