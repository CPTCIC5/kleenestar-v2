"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FeedbackFormSchemaTypes } from "@/lib/types/types";
import { FeedbackFormSchema } from "@/lib/zod/schemas/schema";
import { useSendFeedback } from "@/hooks/useSendFeedback";
import { Icons } from "@/assets/icons";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Label } from "../ui/label";

interface FeedbackFormProps {
    formData: FormData | null;
    file: string;
    setFile: React.Dispatch<React.SetStateAction<string>>;
    setFormData: React.Dispatch<React.SetStateAction<FormData | null>>;
}

export default function FeedbackForm({ formData, setFile, file, setFormData }: FeedbackFormProps) {
    const form = useForm<FeedbackFormSchemaTypes>({
        resolver: zodResolver(FeedbackFormSchema),
        mode: "onChange",
        defaultValues: {
            subject: "",
            message: "",
        },
    });

    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [selectedEmoji, setSelectedEmoji] = useState<string[]>([]);
    const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const mutation = useSendFeedback();
    const [validations, setValidations] = useState({ options: "", emoji: "" });

    const handleOptionChange = (option: number) => setSelectedOption(option);
    const handleEmojiChange = (emoji: string) =>
        setSelectedEmoji((prevSelected) =>
            prevSelected.includes(emoji)
                ? prevSelected.filter((item) => item !== emoji)
                : [...prevSelected, emoji],
        );

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
        setSelectedEmoji([]);
        setSelectedOption(null);
        setFile("");
        form.reset();
    };

    const emojiButtons = [
        { name: "astonished", Icon: Icons.astonished },
        { name: "cry", Icon: Icons.cry },
        { name: "unamused", Icon: Icons.unamused },
        { name: "smirking", Icon: Icons.smirking },
        { name: "happy", Icon: Icons.happy },
        { name: "more-happy", Icon: Icons.more_happy },
        { name: "in-love", Icon: Icons.in_love },
        { name: "smiling", Icon: Icons.smiling },
        { name: "vomiting", Icon: Icons.vomiting },
    ];

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader className="space-y-5">
                        <div className="space-y-2">
                            <Label>How urgent is it?</Label>
                            <div className="flex flex-wrap gap-3 items-center justify-center">
                                {options.map((option) => (
                                    <Button
                                        variant="outline"
                                        key={option}
                                        className={`h-10 w-10 ${
                                            selectedOption === option &&
                                            "bg-foreground text-background hover:bg-foreground hover:text-background"
                                        }`}
                                        disabled={mutation.isPending}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleOptionChange(option);
                                        }}
                                    >
                                        {option}
                                    </Button>
                                ))}
                            </div>
                            {validations.options && (
                                <p className="text-[0.8rem] font-medium text-destructive mb-2">
                                    {validations.options}
                                </p>
                            )}
                        </div>
                        <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subject</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="subject"
                                            type="text"
                                            disabled={mutation.isPending}
                                            className="h-11 focus-visible:ring-pop-blue focus-visible:ring-2"
                                            placeholder="What is it about?"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Write your message here..."
                                            disabled={mutation.isPending}
                                            className="h-24 text-sm resize-none focus-visible:ring-pop-blue focus-visible:ring-2"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="space-y-2">
                            <Label>Give us emoji</Label>
                            <div className="flex gap-3 flex-wrap justify-center">
                                {emojiButtons.map(({ name, Icon }) => (
                                    <button
                                        key={name}
                                        disabled={mutation.isPending}
                                        className={`h-10 w-10 flex justify-center items-center rounded-full ${
                                            selectedEmoji.includes(name)
                                                ? "bg-foreground"
                                                : "bg-background"
                                        }`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleEmojiChange(name);
                                        }}
                                    >
                                        <Icon className="h-7 w-7" />
                                    </button>
                                ))}
                            </div>
                            {validations.emoji && (
                                <p className="text-[0.8rem] font-medium text-destructive">
                                    {validations.emoji}
                                </p>
                            )}
                        </div>
                    </CardHeader>
                    <CardFooter className="flex justify-end w-full pt-5">
                        <Button
                            disabled={
                                Object.keys(form.formState.errors).length > 0 ||
                                mutation.isPending ||
                                !selectedOption ||
                                selectedEmoji.length === 0
                            }
                            type="submit"
                            className="primary-btn-gradient"
                        >
                            {mutation.isPending && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Send feedback
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}
