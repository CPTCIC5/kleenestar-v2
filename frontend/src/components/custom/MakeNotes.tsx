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
import avatar from "@/assets/images/avatar.jpg";
import Image from "next/image";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MakeNotesProps {
    id: number;
    note: string;
}

export default function MakeNotes({ note }: MakeNotesProps) {
    const [noteColor, setColor] = useState("");
    const form = useForm<MakeNoteFormSchemaTypes>({
        resolver: zodResolver(MakeNoteFormSchema),
        mode: "onChange",
    });
    const onSubmit = (values: MakeNoteFormSchemaTypes) => {
        console.log(values);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <DialogContent className="max-w-[660.61px] w-full">
                    <DialogHeader>
                        <div className=" font-mainhead text-[18px] text-foreground">
                            Make a note
                        </div>
                        <div className="text-[14px]  ">
                            Save your important findings as notes and find them in your blocknote
                            space.
                        </div>
                    </DialogHeader>
                    <Card>
                        <CardContent className="py-[24px] overflow-auto scrollbar-hide max-h-[200px] h-full  ">
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
                                            setColor("90EE90");
                                        }}
                                        className="w-[20px] hover:scale-125 border-background h-[20px] rounded-full bg-green-500"
                                    ></div>
                                    <div
                                        onClick={() => {
                                            setColor("FFCCCC");
                                        }}
                                        className="w-[20px] hover:scale-125 h-[20px] rounded-full bg-red-500"
                                    ></div>
                                    <div
                                        onClick={() => {
                                            setColor("D3D3D3");
                                        }}
                                        className="w-[20px] hover:scale-125 h-[20px] rounded-full bg-gray-500"
                                    ></div>
                                    <div
                                        onClick={() => {
                                            setColor("E6E6FA");
                                        }}
                                        className="w-[20px] hover:scale-125 h-[20px] rounded-full bg-violet-500"
                                    ></div>
                                    <div
                                        onClick={() => {
                                            setColor("ADD8E6");
                                        }}
                                        className="w-[20px] hover:scale-125 h-[20px] rounded-full bg-blue-500"
                                    ></div>
                                </div>
                            </Card>
                            <Icons.colorPalatte className="" />
                        </div>
                    </div>
                    <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        style={{ backgroundColor: `#${noteColor}` }}
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
                                        {form.watch("notes")?.length || 0} / 500 characters
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    ></FormField>
                    <div className=" flex justify-between items-center">
                        <Card className="max-w-[247px] max-xl:max-w-[180px] py-[7px] px-[10px] rounded-[10px]  w-full bg-foreground">
                            <div className="w-full items-center flex justify-between">
                                <div className="flex text-[13px] items-center  text-background gap-4">
                                    <div className="w-fit h-fit rounded-full bg-red-100 border-gray-600 border-2">
                                        <Image
                                            width={40}
                                            className="rounded-full w-[20px] h-[20px]"
                                            height={40}
                                            loading="lazy"
                                            src={avatar}
                                            alt="avatar"
                                        ></Image>
                                    </div>
                                    Tristan&apos;s notes
                                </div>
                                <div className="text-background w-[20px] h-[20px] ">
                                    <Icons.down_chevron />
                                </div>
                            </div>
                        </Card>
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
                </DialogContent>
            </form>
        </Form>
    );
}
