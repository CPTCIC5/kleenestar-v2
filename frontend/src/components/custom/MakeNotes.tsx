"use client";

import { DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/assets/icons";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MakeNoteFormSchema } from "@/lib/zod/schemas/schema";
import { MakeNoteFormSchemaTypes } from "@/lib/types/types";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useBlockNotes } from "@/hooks/useBlocknotes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useCreateNote } from "@/hooks/useCreateNote";

interface MakeNotesProps {
    prompt_id: number;
    note: string;
}

interface BlockNoteTypes {
    id: number;
    image: string;
    created_at: string;
    title: string;
}

export default function MakeNotes({ prompt_id, note }: MakeNotesProps) {
    const { data: blockNotes = [], isLoading, isSuccess } = useBlockNotes();
    const [noteColor, setColor] = useState("");
    const form = useForm<MakeNoteFormSchemaTypes>({
        resolver: zodResolver(MakeNoteFormSchema),
        mode: "onChange",
    });

    const { mutate: mutateCreateNote } = useCreateNote();

    const onSubmit = (data: MakeNoteFormSchemaTypes) => {
        console.log("blocknote_id", Number(data.blocknote_id));
        console.log("color", noteColor);
        console.log("notes", data.note);

        const noteData = {
            blocknote_id: Number(data.blocknote_id),
            note: data.note,
            color: noteColor,
        };

        mutateCreateNote({ id: prompt_id, data: noteData });
    };

    return (
        <DialogContent className="max-w-[660.61px] w-full">
            <DialogHeader>
                <div className=" font-mainhead text-[18px] text-foreground">Make a note</div>
                <div className="text-[14px]  ">
                    Save your important findings as notes and find them in your blocknote space.
                </div>
            </DialogHeader>
            <Card className="markdown-body ">
                <CardContent className="py-[24px] overflow-auto scrollbar-hide max-h-[200px] h-full ">
                    <Markdown remarkPlugins={[remarkGfm]}>{note}</Markdown>
                </CardContent>
            </Card>

            <div className="py-[10px] flex justify-between">
                <div className=" font-mainhead text-[15px] text-foreground">Note</div>
                <div className="flex group cursor-pointer items-center">
                    <Card className="fixed right-10  group-hover:block hover:block hidden bg-foreground text-background py-[10px] mx-2 px-[20px]  ">
                        <div className="flex gap-4 items-center">
                            <div
                                onClick={() => {
                                    setColor("#90EE90");
                                }}
                                className="w-[20px] hover:scale-125 border-background h-[20px] rounded-full bg-green-500"
                            ></div>
                            <div
                                onClick={() => {
                                    setColor("#FFCCCC");
                                }}
                                className="w-[20px] hover:scale-125 h-[20px] rounded-full bg-red-500"
                            ></div>
                            <div
                                onClick={() => {
                                    setColor("#D3D3D3");
                                }}
                                className="w-[20px] hover:scale-125 h-[20px] rounded-full bg-gray-500"
                            ></div>
                            <div
                                onClick={() => {
                                    setColor("#E6E6FA");
                                }}
                                className="w-[20px] hover:scale-125 h-[20px] rounded-full bg-violet-500"
                            ></div>
                            <div
                                onClick={() => {
                                    setColor("#ADD8E6");
                                }}
                                className="w-[20px] hover:scale-125 h-[20px] rounded-full bg-blue-500"
                            ></div>
                        </div>
                    </Card>
                    <Icons.colorPalatte className="" />
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="note"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        style={{ backgroundColor: `${noteColor}` }}
                                        placeholder="Say something here..."
                                        className={cn(
                                            noteColor === ""
                                                ? "text-foreground"
                                                : "dark:text-background text-foreground",
                                            "text-[14px]   resize-none h-[130px]",
                                        )}
                                        {...field}
                                    />
                                </FormControl>
                                <div className="flex justify-between">
                                    <FormMessage />
                                    <div
                                        className={cn(
                                            Object.keys(form.formState.errors).length > 0
                                                ? "text-destructive"
                                                : "",
                                            "text-[12px]",
                                        )}
                                    >
                                        {form.watch("note")?.length || 0} / 500 characters
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />
                    <div className=" flex justify-between items-center">
                        <FormField
                            control={form.control}
                            name="blocknote_id"
                            render={({ field }) => (
                                <FormItem>
                                    <Select
                                        onValueChange={(value) =>
                                            field.onChange(parseInt(value, 10))
                                        }
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Blocknote" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {blockNotes.map((item: BlockNoteTypes) => {
                                                return (
                                                    <SelectItem
                                                        value={String(item.id)}
                                                        key={item.id}
                                                    >
                                                        <div className="flex flex-row gap-[9px] items-center justify-start">
                                                            <Avatar className="w-[20px] h-[20px]  rounded-full ">
                                                                <AvatarImage
                                                                    className="rounded-full border-2 border-muted"
                                                                    src={
                                                                        item.image
                                                                            ? `https://twemoji.maxcdn.com/v/latest/svg/${item.image}.svg`
                                                                            : "https://github.com/shadcn.png"
                                                                    }
                                                                    alt="@shadcn"
                                                                />
                                                                <AvatarFallback className="flex items-center justify-center">
                                                                    N
                                                                </AvatarFallback>
                                                            </Avatar>

                                                            <span className="text-[12px]">
                                                                {item.title}
                                                            </span>
                                                        </div>
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            disabled={
                                Object.keys(form.formState.errors).length > 0 ||
                                form.formState.isSubmitting
                            }
                            type="submit"
                            className="rounded-[10px] py-[2px] px-[10px]"
                        >
                            {form.formState.isSubmitting && (
                                <Icons.spinner className="mr-2 h-2 w-2 animate-spin" />
                            )}
                            Save note
                        </Button>
                    </div>
                </form>
            </Form>
        </DialogContent>
    );
}
