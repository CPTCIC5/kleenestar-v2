import { useCreateNote } from "@/hooks/blocknotes/useCreateNote";
import { useFetchBlocknotes } from "@/hooks/blocknotes/useFetchBlocknotes";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { BookmarkSimple, PencilSimple, SpinnerGap } from "@phosphor-icons/react/dist/ssr";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { colorClasses } from "@/constants/color.constants";
import BlocknotesCombobox from "../combobox/CreateNoteBlocknoteCombobox";
import { Input } from "@/components/ui/input";
import { useUpdateNote } from "@/hooks/blocknotes/useUpdateNote";

interface NoteEditDialogProps {
    note: Note;
}

export function NoteEditDialog({ note }: NoteEditDialogProps) {
    const { data: fetchedBlocknotes = [], isSuccess: fetchBlocknotesSuccess } =
        useFetchBlocknotes();
    const { mutate: updateNoteMutate, isPending: updateNotePending } = useUpdateNote();

    const [noteColor, setNoteColor] = React.useState<string>(note.color);
    const [noteText, setNoteText] = React.useState<string>(note.note_text);
    const [noteTag, setNoteTag] = React.useState<string>(note.note_tag);
    const [blocknotesComboboOpen, setBlocknotesComboboOpen] = React.useState(false);
    const [blocknoteId, setblocknoteId] = React.useState(String(note.blocknote.id));

    const updateNote = async () => {
        console.log(noteColor, noteText, updateNotePending, noteTag, blocknoteId);
        updateNoteMutate({
            noteId: note.id,
            blocknoteId: Number(blocknoteId),
            noteColor,
            noteText,
            noteTag,
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="secondary"
                    size="icon"
                    className="size-7 text-primary bg-primary/40 hover:bg-primary/50"
                >
                    <PencilSimple weight="duotone" className="size-4" />
                </Button>
            </DialogTrigger>

            <DialogContent
                className="w-[calc(100%-0.75rem)] rounded-xl"
                overlayClassName="backdrop-blur-sm"
            >
                <DialogHeader className="space-y-1">
                    <DialogTitle className="font-bricolage">Create Note</DialogTitle>
                    <DialogDescription className="text-xs">
                        Save your important findings as notes and find them in your blocknote space.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col w-full h-full space-y-5">
                    <Card className="overflow-hidden">
                        <CardContent className="p-4 markdown-styles">
                            <ScrollArea className="flex flex-col w-full h-full ">
                                <ScrollBar orientation="vertical" />
                                <div className="max-h-52 space-x-4 pr-4  !text-xs">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {note.prompt.response_text}
                                    </ReactMarkdown>
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>

                    <div className="space-y-3">
                        <Label>Tag</Label>

                        <Input
                            type="text"
                            placeholder="note tag"
                            name="noteTag"
                            value={noteTag}
                            maxLength={50}
                            onChange={(e) => setNoteTag(e.target.value)}
                            className="bg-secondary"
                        />
                    </div>

                    <div className="space-y-3">
                        <div className="w-full flex justify-between items-center gap-3">
                            <Label>Note</Label>
                            <div className="rounded-sm border border-border py-1 px-2 flex gap-2">
                                {["default", "red", "emerald", "sky", "indigo"].map((color) => {
                                    return (
                                        <div
                                            key={color}
                                            onClick={() => setNoteColor(color)}
                                            className={`size-4 hover:scale-110 transition-all duration-300 rounded ${
                                                colorClasses[color as keyof typeof colorClasses]
                                            } cursor-pointer`}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                        <Textarea
                            name="createNote"
                            value={noteText}
                            maxLength={400}
                            onChange={(e) => setNoteText(e.target.value)}
                            placeholder="write a short note here…"
                            className={`resize-none h-28 placeholder:text-foreground/60  ${
                                colorClasses[noteColor as keyof typeof colorClasses]
                            }`}
                        />
                    </div>

                    <DialogFooter className="flex flex-row items-center justify-between w-full sm:justify-between">
                        <BlocknotesCombobox
                            {...{
                                blocknotes: fetchedBlocknotes,
                                blocknotesComboboOpen,
                                setBlocknotesComboboOpen,
                                value: blocknoteId,
                                setValue: setblocknoteId,
                            }}
                        />
                        <DialogClose
                            type="submit"
                            disabled={
                                !noteColor ||
                                !noteText ||
                                updateNotePending ||
                                !noteTag ||
                                !blocknoteId
                            }
                            className={cn(buttonVariants({ variant: "default" }))}
                            onClick={updateNote}
                        >
                            {updateNotePending && (
                                <SpinnerGap className="mr-2 size-4 animate-spin" />
                            )}
                            Update
                        </DialogClose>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}
