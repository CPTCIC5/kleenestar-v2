"use client";

import { useIndividualNotes } from "@/hooks/useIndividualNote";
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
import { convertDateTime } from "@/lib/services/convertDateTime";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Icons } from "@/assets/icons";
import ClassicLoader from "@/components/ui/classic-loader";

interface Note {
    id: number;
    note_text: string;
    color: string;
    prompt: {
        convo: {
            id: number;
            title: string;
        };
        response_text: string;
    };
    created_at: string;
}

interface Blocknote {
    id: number;
    image: string;
    created_at: string;
    title: string;
    blocknote: {
        id: number;
        title: string;
        image: string;
        created_at: string;
    };
    notes: Note[];
}

function NotePage({ params }: { params: { blocknoteId: string } }) {
    const blocknoteId = parseInt(params.blocknoteId);

    const { data: notes = [], isLoading } = useIndividualNotes(blocknoteId);

    console.log(notes);

    return (
        <div className="flex justify-center items-center ">
            {isLoading ? (
                <div className="w-full h-[calc(100vh-145px)]  sm:h-[calc(100vh-80px)] flex justify-center items-center ">
                    <ClassicLoader />
                </div>
            ) : notes.length === 0 ? (
                <div className="w-full h-[calc(100vh-145px)]  sm:h-[calc(100vh-80px)]  flex justify-center items-center">
                    <CardDescription className="text-center">
                        This blocknote is empty. Add notes to this blocknote or choose another
                        blocknote to view its contents.
                    </CardDescription>
                </div>
            ) : (
                <div className="columns-1 md:columns-2  max-w-full xlg:columns-1 xlg:max-w-xl min-[1350px]:columns-2 min-[1350px]:max-w-4xl 2xl:max-w-5xl min-[1900px]:max-w-7xl h-full  gap-4 space-y-4 ">
                    {notes.map((note: Note) => {
                        return (
                            <div
                                key={note?.id}
                                className="rounded-2xl bg-background p-5 space-y-4 w-full break-inside-avoid "
                            >
                                <div className="flex items-center justify-between w-full">
                                    <CardDescription>
                                        {note &&
                                            note?.created_at &&
                                            convertDateTime(note?.created_at)}
                                    </CardDescription>
                                    <div className="flex items-center justify-end gap-3">
                                        <Button
                                            variant="ghost"
                                            className=" p-1 !h-full rounded-full"
                                        >
                                            <Icons.solarPenNewLine className="h-5 w-5" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className=" p-1 !h-full rounded-full"
                                        >
                                            <Icons.solarBinLine className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>

                                <div
                                    style={{ backgroundColor: note?.color }}
                                    className="rounded-2xl p-3 text-black/90"
                                >
                                    {note?.note_text}
                                </div>

                                <div>
                                    <Image
                                        src={landscapeImg}
                                        alt="img"
                                        className="rounded-2xl max-h-[300px] "
                                    />
                                </div>

                                <div className="h-[30rem] border border-muted rounded-xl overflow-auto scrollbar-thin p-2 markdown-body !text-sm ">
                                    <Markdown remarkPlugins={[remarkGfm]}>
                                        {note?.prompt?.response_text}
                                    </Markdown>
                                </div>

                                <div className="flex justify-between items-center rounded-2xl bg-muted w-full px-4 py-1">
                                    <CardTitle>{note?.prompt?.convo?.title}</CardTitle>
                                    <Link
                                        href={`/chat/${note?.prompt?.convo?.id}/`}
                                        className={cn(buttonVariants({ variant: "ghost" }))}
                                    >
                                        <Icons.solarChatRoundLine className="h-6 w-6" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default NotePage;
