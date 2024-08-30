"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import React, { ChangeEvent } from "react";
import { FeedbackFormSchemaTypes } from "@/types/zod.types";
import { FeedbackFormSchema } from "@/lib/zod/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Smiley,
    SmileyAngry,
    SmileyMeh,
    SmileyNervous,
    SmileySad,
    SmileyWink,
    SmileyXEyes,
    SpinnerGap,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { useSendFeedback } from "@/hooks/workspace/useSendFeedback";
import { cn } from "@/lib/utils";

interface FeedbackFormProps {
    className?: string;
}

export function FeedbackForm({ className }: FeedbackFormProps) {
    const { mutate, isPending } = useSendFeedback();

    const form = useForm<FeedbackFormSchemaTypes>({
        resolver: zodResolver(FeedbackFormSchema),
        mode: "onChange",
        defaultValues: {
            feedbackSubject: "",
            feedbackMessage: "",
        },
    });

    const { feedbackSubject, feedbackMessage } = form.watch();

    const attachmentInputRef = React.useRef<HTMLInputElement>(null);
    const [attachmentFile, setAttachmentFile] = React.useState<File | null>(null);
    const [attachmentFileUrl, setAttachmentFileUrl] = React.useState<string | null>(null);

    const handleAttachmentUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAttachmentFile(file);
            setAttachmentFileUrl(URL.createObjectURL(file));
        }
    };

    const feedbackUrgencyOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [feedbackUrgencyLevel, setFeedbackUrgencyLevel] = React.useState<number | null>(null);

    const feedbackExpressionOptions = [
        { name: "smile", Icon: Smiley },
        { name: "wink", Icon: SmileyWink },
        { name: "sad", Icon: SmileySad },
        { name: "nervous", Icon: SmileyNervous },
        { name: "angry", Icon: SmileyAngry },
        { name: "unamused", Icon: SmileyMeh },
        { name: "astonished", Icon: SmileyXEyes },
    ];

    const [feedbackExpression, setFeedbackExpression] = React.useState<string>("");

    const onSubmit = (data: FeedbackFormSchemaTypes) => {
        const { feedbackMessage, feedbackSubject } = data;
        const feedbackFormData = new FormData();
        if (attachmentFile) {
            feedbackFormData.append("attachment", attachmentFile);
        }
        feedbackFormData.append("urgency", String(feedbackUrgencyLevel));
        feedbackFormData.append("subject", feedbackSubject);
        feedbackFormData.append("message", feedbackMessage);
        feedbackFormData.append("emoji", JSON.stringify(feedbackExpression));

        mutate(feedbackFormData);
        setFeedbackExpression("");
        setFeedbackUrgencyLevel(null);
        setAttachmentFile(null);
        setAttachmentFileUrl(null);
        form.reset();
    };

    return (
        <Card className={cn("bg-secondary/30", className)}>
            <CardHeader className="space-y-0">
                <CardDescription>
                    Fill out the form below to get in touch with our support team.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-3">
                    <Label>Attachment</Label>
                    <CardDescription>
                        Attach a screenshot to help us understand your issue better.
                    </CardDescription>
                    <div className="flex items-center justify-start gap-3">
                        {attachmentFileUrl && (
                            <Image
                                src={attachmentFileUrl}
                                width={200}
                                height={200}
                                alt="attachment"
                                className="size-20 rounded-lg object-cover"
                            />
                        )}
                        <Button
                            onClick={() => attachmentInputRef.current?.click()}
                            variant="secondary"
                            disabled={isPending}
                        >
                            {attachmentFile ? "Change" : "Add"}
                        </Button>
                        <input
                            ref={attachmentInputRef}
                            type="file"
                            className="hidden"
                            disabled={isPending}
                            name="avatar"
                            accept="image/*"
                            onChange={handleAttachmentUpload}
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <Label>Urgency level</Label>
                    <div className="flex flex-wrap gap-3 items-center justify-center">
                        {feedbackUrgencyOptions.map((option) => (
                            <Button
                                variant={feedbackUrgencyLevel === option ? "default" : "secondary"}
                                key={option}
                                size="icon"
                                disabled={isPending}
                                onClick={() => setFeedbackUrgencyLevel(option)}
                            >
                                {option}
                            </Button>
                        ))}
                    </div>
                    {!feedbackUrgencyLevel && (
                        <p className="text-[0.8rem] font-medium text-destructive mb-2">
                            Please select an urgency level.
                        </p>
                    )}
                </div>

                <div className="space-y-3">
                    <Label>Express yourself</Label>
                    <div className="flex gap-3 flex-wrap justify-center">
                        {feedbackExpressionOptions.map(({ name, Icon }) => (
                            <Button
                                variant={
                                    feedbackExpression.includes(name) ? "default" : "secondary"
                                }
                                key={name}
                                size="icon"
                                disabled={isPending}
                                className="rounded-full"
                                onClick={() => setFeedbackExpression(name)}
                            >
                                <Icon className="h-7 w-7" />
                            </Button>
                        ))}
                    </div>
                    {!feedbackExpression && (
                        <p className="text-[0.8rem] font-medium text-destructive">
                            Please select an expression.
                        </p>
                    )}
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
                        <FormField
                            control={form.control}
                            name="feedbackSubject"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Subject</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="what is it about?"
                                            className="bg-secondary"
                                            disabled={isPending}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="feedbackMessage"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Write your message here..."
                                            disabled={isPending}
                                            className="h-24 resize-none bg-secondary"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <CardFooter className="p-0 items-end justify-end pt-4">
                            <Button
                                type="submit"
                                disabled={
                                    Object.keys(form.formState.errors).length > 0 ||
                                    isPending ||
                                    !feedbackUrgencyLevel ||
                                    feedbackExpression.length === 0 ||
                                    !feedbackSubject ||
                                    !feedbackMessage
                                }
                            >
                                {isPending && <SpinnerGap className="mr-2 h-4 w-4 animate-spin" />}
                                Send feedback
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
