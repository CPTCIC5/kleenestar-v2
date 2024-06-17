import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Button, buttonVariants } from "../ui/button";
import { Icons } from "@/assets/icons";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { useAdditionalFeedback } from "@/hooks/useAdditionalFeedback";
import { Card, CardContent } from "../ui/card";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useCreateNote } from "@/hooks/useCreateNote";
import { useBlockNotes } from "@/hooks/useBlocknotes";

interface MakeNotesProps {
    prompt_id: number;
    response_text: string;
}

interface BlockNoteTypes {
    id: number;
    image: string;
    created_at: string;
    title: string;
}

const CreateNoteDialog = ({ prompt_id, response_text }: MakeNotesProps) => {
    const { data: blockNotes = [], isLoading, isSuccess } = useBlockNotes();
    const { mutate: mutateCreateNote } = useCreateNote();

    const [color, setColor] = useState<string>("");
    const [note, setNote] = useState<string>("");
    const [blocknoteId, setBlocknoteId] = useState<number | null>(null);
    const [errors, setErrors] = useState<string[]>([]);
    const [selectValue, setSelectValue] = useState<string>("");

    const onSubmit = () => {
        const newErrors = [];

        if (color === "") newErrors.push("Note color is required");
        if (note === "") newErrors.push("Note is required");
        if (!blocknoteId) newErrors.push("Blocknote isn't chosen");

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }

        const noteData = {
            blocknote_id: blocknoteId,
            note: note,
            color: color,
        };
        console.log(noteData);
        mutateCreateNote({ id: prompt_id, data: noteData });

        // Reset the form fields
        setColor("");
        setNote("");
        setBlocknoteId(null);
        setSelectValue("");
        setErrors([]);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div
                    className={cn(
                        buttonVariants({
                            variant: "outline",
                        }),
                        "h-fit p-1 cursor-pointer",
                    )}
                >
                    <Icons.solarClipboardLine className="w-4 h-4" />
                </div>
            </DialogTrigger>
            <DialogContent
                className="rounded-xl sm:rounded-2xl w-[calc(100%-1.25rem)] max-w-2xl"
                overlayClassName="backdrop-blur-sm"
            >
                <DialogHeader className="mt-4 sm:mt-0">
                    <DialogTitle className="font-mainhead text-lg ">Make a note</DialogTitle>
                    <DialogDescription>
                        Save your important findings as notes and find them in your blocknote space.
                    </DialogDescription>
                </DialogHeader>
                <Card className="markdown-body rounded-2xl  overflow-hidden p-5">
                    <CardContent className=" overflow-auto scrollbar-thin !text-xs">
                        <div className=" max-h-[200px] h-full ">
                            <Markdown remarkPlugins={[remarkGfm]}>{response_text}</Markdown>
                        </div>
                    </CardContent>
                </Card>
                <div className="space-y-3 w-full mt-1">
                    <div className="flex justify-between items-center gap-5">
                        <Label>Note</Label>
                        <div className="flex group cursor-pointer items-center pl-4">
                            <Card className="fixed right-10 mx-2  group-hover:block hover:block hidden text-background p-1 ">
                                <div className="flex gap-3 items-center">
                                    <div
                                        onClick={() => {
                                            setColor("#90EE90");
                                        }}
                                        className="w-4 h-4 hover:scale-110 rounded-full bg-[#90EE90]"
                                    ></div>
                                    <div
                                        onClick={() => {
                                            setColor("#FFCCCC");
                                        }}
                                        className="w-4 h-4 hover:scale-110 rounded-full bg-[#FFCCCC]"
                                    ></div>
                                    <div
                                        onClick={() => {
                                            setColor("#D3D3D3");
                                        }}
                                        className="w-4 h-4 hover:scale-110 rounded-full bg-[#D3D3D3]"
                                    ></div>
                                    <div
                                        onClick={() => {
                                            setColor("#E6E6FA");
                                        }}
                                        className="w-4 h-4 hover:scale-110 rounded-full bg-[#E6E6FA]"
                                    ></div>
                                    <div
                                        onClick={() => {
                                            setColor("#ADD8E6");
                                        }}
                                        className="w-4 h-4 hover:scale-110 rounded-full bg-[#ADD8E6]"
                                    ></div>
                                </div>
                            </Card>
                            <Icons.solarColorPaletteLine className="h-5 w-5" />
                        </div>
                    </div>
                    <Textarea
                        name="feedback"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Say something here..."
                        style={{ backgroundColor: `${color}` }}
                        className={`text-black resize-none h-28 rounded-lg scrollbar-thin focus-visible:ring-ring/30`}
                    />
                </div>
                {errors.length !== 0 && (
                    <div className="space-y-1">
                        {errors.map((error, index) => {
                            return (
                                <div
                                    key={index}
                                    className="text-[0.8rem] font-medium text-destructive w-full text-center sm:text-left"
                                >
                                    {`*${error}`}
                                </div>
                            );
                        })}
                    </div>
                )}
                <DialogFooter className="flex flex-row !justify-between items-center">
                    <div>
                        <Select
                            value={selectValue}
                            onValueChange={(value) => {
                                setBlocknoteId(parseInt(value, 10));
                                setSelectValue(value);
                            }}
                        >
                            <SelectTrigger className="px-2">
                                <SelectValue placeholder="Select Blocknote" />
                            </SelectTrigger>
                            <SelectContent sideOffset={5}>
                                {blockNotes.map((item: BlockNoteTypes) => (
                                    <SelectItem value={String(item.id)} key={item.id}>
                                        <div className="flex flex-row gap-2 items-center">
                                            <Avatar className="w-5 h-5 rounded-full bg-muted flex items-center justify-center">
                                                <AvatarImage
                                                    className="w-3 h-3"
                                                    src={
                                                        item.image
                                                            ? item.image
                                                            : "https://github.com/shadcn.png"
                                                    }
                                                    alt="@shadcn"
                                                />
                                                <AvatarFallback className="flex items-center justify-center">
                                                    N
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-xs">{item.title}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button onClick={onSubmit} type="submit" className="px-4 py-5 rounded-xl">
                        Save note
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateNoteDialog;
