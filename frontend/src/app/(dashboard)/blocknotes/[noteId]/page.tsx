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

type NoteType = {
    id: number;
    note_text: string;
    color: string;
    prompt: {
        convo: string;
        response_text: string;
    };
    created_at: string;
};

type BlockNoteType = {
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
    notes: NoteType[];
};

function IndividualBlocknotesPage({ params }: { params: { noteId: string } }) {
    const noteId = parseInt(params.noteId);
    const router = useRouter();

    const { data: noteData, isSuccess } = useIndividualNotes(noteId);
    const [blockNoteData, setBlockNoteData] = React.useState<BlockNoteType | null>(null);

    React.useEffect(() => {
        if (isSuccess) {
            console.log("noteData", noteData);
            console.log("blocknoteData", noteData[0].blocknote);
            setBlockNoteData(noteData[0].blocknote);
        }
    }, [noteData, isSuccess]);

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
                                <Avatar className="w-[40.44px] h-[40.44px] relative rounded-full border-2 border-muted p-[7px]">
                                    <AvatarImage
                                        alt="blocknote-image"
                                        src={
                                            blockNoteData?.image
                                                ? `https://twemoji.maxcdn.com/v/latest/svg/${blockNoteData?.image}.svg`
                                                : "https://github.com/shadcn.png"
                                        }
                                    />
                                </Avatar>

                                <div className="flex-1">
                                    <CardTitle className="text-[15px]">
                                        {blockNoteData?.title}
                                    </CardTitle>
                                    <CardDescription className="text-[11px]">
                                        {`Last modified: ${
                                            blockNoteData &&
                                            blockNoteData.created_at &&
                                            convertDateTime(blockNoteData?.created_at)
                                        }`}
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
                    {noteData?.map((note: NoteType) => {
                        return (
                            <Card key={note.id}>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardDescription>
                                        {note &&
                                            note.created_at &&
                                            convertDateTime(note?.created_at)}
                                    </CardDescription>
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
                                        {note.note_text}
                                    </div>
                                    <div>
                                        <Image
                                            src={landscapeImg}
                                            alt="img"
                                            className="rounded-2xl max-h-[300px] "
                                        />
                                    </div>

                                    <div className="h-[550px] border border-muted rounded-xl overflow-auto scrollbar-hide p-2 markdown-body">
                                        <Markdown remarkPlugins={[remarkGfm]}>
                                            {note?.prompt?.response_text}
                                        </Markdown>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <div className="flex flex-row justify-between items-center rounded-xl bg-muted w-full p-1">
                                        <CardTitle className="pl-1">
                                            {note?.prompt?.convo}
                                        </CardTitle>
                                        <Link
                                            href={`/chat/${note?.prompt?.convo}/`}
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

export default IndividualBlocknotesPage;
