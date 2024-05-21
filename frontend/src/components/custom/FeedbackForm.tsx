"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/assets/icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FeedbackFormSchemaTypes } from "@/lib/types/types";
import { FeedbackFormSchema } from "@/lib/zod/schemas/schema";
import { useSendFeedback } from "@/hooks/useSendFeedback";

import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

export default function FeedbackForm({ formData }: { formData: FormData }) {
    const form = useForm<FeedbackFormSchemaTypes>({
        resolver: zodResolver(FeedbackFormSchema),
        mode: "onChange",
    });

    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [selectedEmoji, setSelectedEmoji] = useState<string[]>([]);
    const options = [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
    ];

    const handleOptionChange = (option: number) => {
        setSelectedOption(option);
    };

    const handleEmojiChange = (emoji: string) => {
        setSelectedEmoji((prevSelected) =>
            prevSelected.includes(emoji)
                ? prevSelected.filter((item) => item !== emoji)
                : [...prevSelected, emoji],
        );
    };

    const [validations, setValidations] = useState<{ options: string; emoji: string }>({
        options: "",
        emoji: "",
    });

    const mutation = useSendFeedback();

    const onSubmit = async (values: FeedbackFormSchemaTypes) => {
        const data = { ...values, selectedEmoji, selectedOption };

        const optionError = !selectedOption ? "This field is required" : "";
        const emojiError = selectedEmoji.length === 0 ? "Please select an emoji" : "";

        setValidations({ options: optionError, emoji: emojiError });

        if (optionError || emojiError) return;

        if (!formData) formData = new FormData();
        formData.append("urgency", String(data.selectedOption));
        formData.append("subject", data.subject);
        formData.append("message", data.message);
        formData.append("emoji", JSON.stringify(data.selectedEmoji));

        mutation.mutate(formData);
    };

    return (
        <div>
            <div className="py-[20px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <Card>
                            <CardContent className="px-[23.48px] py-[25.50px]">
                                <div>
                                    <p className="text-[14px] ">How urgent is it?</p>
                                    <div className="py-2">
                                        <div className="w-full flex  gap-[10.33px] max-xl:flex-wrap max-xl:flex-col max-xl:items-center">
                                            {options.map((optionslist, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="w-full flex gap-[10.33px] justify-between"
                                                    >
                                                        {optionslist.map((option) => {
                                                            return (
                                                                <button
                                                                    key={option}
                                                                    className={`h-[45px] w-[45px] max-xl:h-[40px] max-xl:w-[40px]  px-2 mx-[3px] rounded-[10px] border-2 ${
                                                                        selectedOption === option
                                                                            ? "bg-foreground text-background"
                                                                            : "bg-background text-foreground"
                                                                    }`}
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        handleOptionChange(option);
                                                                    }}
                                                                >
                                                                    {option}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    {validations.options && (
                                        <p className="text-[0.8rem] font-medium text-destructive mb-2">
                                            {validations.options}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <p className="text-[14px] ">Subject</p>
                                    <div className="py-2">
                                        <FormField
                                            control={form.control}
                                            name="subject"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            className={cn(
                                                                "text-[14px]  bg-clip-text h-[45px]",
                                                            )}
                                                            id="subject"
                                                            type="text"
                                                            placeholder="What is it about?"
                                                            disabled={false}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        ></FormField>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[14px] ">Message</p>
                                    <div className="py-2">
                                        <FormField
                                            control={form.control}
                                            name="message"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Write your message here..."
                                                            className="text-[14px]  resize-none h-[95px]"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        ></FormField>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[14px] ">Give us emoji</p>
                                    <div className="pt-[10px]">
                                        {" "}
                                        <div className="flex gap-[17px] flex-wrap">
                                            <button
                                                className={`h-[50px] w-[50px]  px-2 mx-[3px]   flex justify-center items-center rounded-full ${
                                                    selectedEmoji.includes("astonished")
                                                        ? "bg-foreground"
                                                        : "bg-background"
                                                }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleEmojiChange("astonished");
                                                }}
                                            >
                                                <Icons.astonished className="h-[30px] w-[30px]" />
                                            </button>
                                            <button
                                                className={`h-[50px] w-[50px]  px-2 mx-[3px]   flex justify-center items-center rounded-full ${
                                                    selectedEmoji.includes("cry")
                                                        ? "bg-foreground"
                                                        : "bg-background"
                                                }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleEmojiChange("cry");
                                                }}
                                            >
                                                <Icons.cry className="h-[30px] w-[30px]" />
                                            </button>
                                            <button
                                                className={`h-[50px] w-[50px]  px-2 mx-[3px]   flex justify-center items-center rounded-full ${
                                                    selectedEmoji.includes("unamused")
                                                        ? "bg-foreground"
                                                        : "bg-background"
                                                }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleEmojiChange("unamused");
                                                }}
                                            >
                                                <Icons.unamused className="h-[30px] w-[30px]" />
                                            </button>
                                            <button
                                                className={`h-[50px] w-[50px]  px-2 mx-[3px]   flex justify-center items-center rounded-full ${
                                                    selectedEmoji.includes("smirking")
                                                        ? "bg-foreground"
                                                        : "bg-background"
                                                }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleEmojiChange("smirking");
                                                }}
                                            >
                                                <Icons.smirking className="h-[30px] w-[30px]" />
                                            </button>
                                            <button
                                                className={`h-[50px] w-[50px]  px-2 mx-[3px]   flex justify-center items-center rounded-full ${
                                                    selectedEmoji.includes("happy")
                                                        ? "bg-foreground"
                                                        : "bg-background"
                                                }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleEmojiChange("happy");
                                                }}
                                            >
                                                <Icons.happy className="h-[30px] w-[30px]" />
                                            </button>
                                            <button
                                                className={`h-[50px] w-[50px]  px-2 mx-[3px]   flex justify-center items-center rounded-full ${
                                                    selectedEmoji.includes("more-happy")
                                                        ? "bg-foreground"
                                                        : "bg-background"
                                                }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleEmojiChange("more-happy");
                                                }}
                                            >
                                                <Icons.more_happy className="h-[30px] w-[30px]" />
                                            </button>
                                            <button
                                                className={`h-[50px] w-[50px]  px-2 mx-[3px]   flex justify-center items-center rounded-full ${
                                                    selectedEmoji.includes("in-love")
                                                        ? "bg-foreground"
                                                        : "bg-background"
                                                }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleEmojiChange("in-love");
                                                }}
                                            >
                                                <Icons.in_love className="h-[30px] w-[30px]" />
                                            </button>
                                            <button
                                                className={`h-[50px] w-[50px]  px-2 mx-[3px]   flex justify-center items-center rounded-full ${
                                                    selectedEmoji.includes("smiling")
                                                        ? "bg-foreground"
                                                        : "bg-background"
                                                }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleEmojiChange("smiling");
                                                }}
                                            >
                                                <Icons.smiling className="h-[30px] w-[30px]" />
                                            </button>
                                            <button
                                                className={`h-[50px] w-[50px]  px-2 mx-[3px]    flex justify-center items-center rounded-full ${
                                                    selectedEmoji.includes("vomiting")
                                                        ? "bg-foreground"
                                                        : "bg-background"
                                                }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleEmojiChange("vomiting");
                                                }}
                                            >
                                                <Icons.vomiting className="h-[30px] w-[30px]" />
                                            </button>
                                        </div>
                                    </div>
                                    {validations.emoji && (
                                        <p className="text-[0.8rem] font-medium text-destructive">
                                            {validations.emoji}
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                        <div className="flex justify-end w-full pt-[20px]">
                            <Button
                                disabled={
                                    Object.keys(form.formState.errors).length > 0 ||
                                    form.formState.isSubmitting
                                }
                                type="submit"
                                className="px-[18px] py-[11px] rounded-[10px]"
                            >
                                {form.formState.isSubmitting && (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Send message
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
