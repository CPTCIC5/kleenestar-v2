"use client";

import { Icons } from "@/assets/icons";
import { SearchInput } from "@/components/custom/inputs/SearchInput";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { colorClasses, sampleNote } from "@/constants/color.constants";
import { useFetchNotes } from "@/hooks/blocknotes/useFetchNotes";
import { cn, convertDateTime } from "@/lib/utils";
import {
    ArrowCircleLeft,
    ChatTeardropText,
    CircleNotch,
    PencilSimple,
    Trash,
} from "@phosphor-icons/react/dist/ssr";
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { NoteDeleteDialog } from "@/components/custom/dialogs/NoteDeleteDialog";
import { NoteEditDialog } from "@/components/custom/dialogs/NoteEditDialog";

interface BlocknoteNotesPageProps {
    params: {
        blocknoteId: string;
    };
}

export default function BlocknoteNotesPage({ params }: BlocknoteNotesPageProps) {
    const router = useRouter();
    const blocknoteId = parseInt(params.blocknoteId);

    const {
        data: { related_notes: fetchedNotes, blocknote: blocknoteDetails } = {},
        isSuccess: fetchNotesSuccess,
    } = useFetchNotes(blocknoteId);

    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const [notes, setNotes] = React.useState<Note[]>([]);

    React.useEffect(() => {
        if (!fetchNotesSuccess) return;
        const filteredNotes = searchNotes(fetchedNotes, searchTerm);
        setNotes(filteredNotes);
    }, [fetchedNotes, fetchNotesSuccess, searchTerm]);

    const handleSearchTermChange = useDebouncedCallback((newSearchTerm: string) => {
        setSearchTerm(newSearchTerm);
    }, 300);

    const searchNotes = (data: Note[] | null | undefined, searchTerm: string): Note[] => {
        if (!data) return data || [];
        const normalizedSearchTerm = searchTerm.trim().toLowerCase();

        if (!normalizedSearchTerm) return data;

        const filteredData = data.filter(
            (note: Note) =>
                note.note_text?.toLowerCase().includes(normalizedSearchTerm) ||
                note.note_tag?.toLowerCase().includes(normalizedSearchTerm),
        );

        return filteredData;
    };

    return (
        <div className="w-full h-[calc(100vh-56px)] md:h-screen flex flex-col items-center p-4 space-y-4">
            <nav className="w-full flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.back()}
                    className="rounded-full p-1 size-fit"
                >
                    <ArrowCircleLeft weight="duotone" className="size-7" />
                </Button>
                <h1 className="text-2xl font-bricolage font-extrabold">
                    {blocknoteDetails?.title}
                </h1>
            </nav>
            <div className="flex flex-col w-full h-full max-w-7xl  items-center flex-[1] space-y-5">
                <section className="flex w-full gap-3">
                    <SearchInput
                        name="Notesearch"
                        type="text"
                        placeholder="Search note"
                        onChange={(e) => handleSearchTermChange(e.target.value)}
                    />
                    <Button
                        variant="secondary"
                        className="gap-2 bg-primary/20 text-primary hover:bg-primary/30"
                    >
                        Tags
                        <div className="rounded-full bg-primary/30 hover:primary/40 size-5 flex items-center justify-center">
                            5
                        </div>
                    </Button>
                </section>

                {fetchNotesSuccess ? (
                    notes?.length > 0 ? (
                        <ScrollArea className="w-full h-full max-h-[calc(100vh-140px)]">
                            <ScrollBar orientation="vertical" />
                            <div
                                className={`h-full w-full rounded-md pr-4  space-y-3  justify-center  columns-1 ${
                                    notes.length > 1 ? "md:columns-2" : "flex flex-col items-center"
                                }  gap-4`}
                            >
                                {notes?.map((note: Note) => {
                                    return (
                                        <Card
                                            key={note?.id}
                                            className="break-inside-avoid bg-secondary/30 max-w-2xl"
                                        >
                                            <CardHeader className="flex-row gap-2 items-center justify-between">
                                                <CardDescription className="text-xs">
                                                    {note?.created_at &&
                                                        convertDateTime(note?.created_at)}
                                                </CardDescription>
                                                <div className="flex items-start justify-center space-x-3">
                                                    <NoteEditDialog note={note} />
                                                    <NoteDeleteDialog
                                                        noteId={note?.id}
                                                        blocknoteId={note?.blocknote?.id}
                                                    />
                                                </div>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div
                                                    className={`rounded-lg  p-3 text-sm text-foreground ${
                                                        colorClasses[
                                                            note?.color as keyof typeof colorClasses
                                                        ]
                                                    }`}
                                                >
                                                    {note?.note_text}
                                                </div>
                                                {note?.note_tag && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="bg-primary/20 text-primary"
                                                    >
                                                        {note?.note_tag}
                                                    </Badge>
                                                )}

                                                <Card className="overflow-hidden">
                                                    <CardContent className="p-4 markdown-styles">
                                                        <ScrollArea className="flex flex-col w-full h-full ">
                                                            <ScrollBar orientation="vertical" />
                                                            <div className="max-h-52 space-x-4 pr-4  !text-xs">
                                                                <ReactMarkdown
                                                                    remarkPlugins={[remarkGfm]}
                                                                >
                                                                    {note?.prompt?.response_text}
                                                                </ReactMarkdown>
                                                            </div>
                                                        </ScrollArea>
                                                    </CardContent>
                                                </Card>
                                            </CardContent>
                                            <CardFooter>
                                                <Link
                                                    href={`/dashboard/chat/${note?.prompt?.convo?.id}/`}
                                                    className={cn(
                                                        buttonVariants({ variant: "secondary" }),
                                                        "flex justify-between items-center w-full",
                                                    )}
                                                >
                                                    <CardTitle className="font-bricolage text-sm">
                                                        {note?.prompt?.convo?.title}
                                                    </CardTitle>
                                                    <ChatTeardropText
                                                        weight="duotone"
                                                        className="size-5"
                                                    />
                                                </Link>
                                            </CardFooter>
                                        </Card>
                                    );
                                })}
                            </div>
                        </ScrollArea>
                    ) : (
                        <div className="w-full flex flex-col items-center justify-center px-10 py-20 bg-secondary rounded-md ">
                            <span className="text-sm text-muted-foreground">No notes found.</span>
                        </div>
                    )
                ) : (
                    <div className="w-full rounded-md pr-2  max-h-[calc(100vh-140px)] h-full flex flex-wrap items-center justify-center gap-3">
                        <CircleNotch
                            weight="duotone"
                            className="animate-spin size-8 text-primary"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
