"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardDescription,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsNotificationFormSchema } from "@/lib/zod/schema";
import { useForm } from "react-hook-form";
import { SettingsNotificationFormSchemaTypes } from "@/types/zod.types";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface SettingsNotificationFormProps {
    className?: string;
}

export function SettingsNotificationForm({ className }: SettingsNotificationFormProps) {
    const form = useForm<SettingsNotificationFormSchemaTypes>({
        resolver: zodResolver(SettingsNotificationFormSchema),
        mode: "onChange",
        defaultValues: {
            notesNotifications: "none",
            communicationEmails: false,
            marketingEmails: false,
            securityEmails: false,
        },
    });

    const onSubmit = (data: SettingsNotificationFormSchemaTypes) => {
        console.log(data);
    };

    return (
        <Card className={cn("bg-secondary/30", className)}>
            <CardHeader className="space-y-0 p-4">
                <CardTitle className="text-lg font-bricolage font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-foreground/60 to-foreground/95">
                    Notification
                </CardTitle>
                <CardDescription className="text-muted-foreground text-xs">
                    Configure how you receive notifications.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
                        <FormField
                            control={form.control}
                            name="notesNotifications"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Notify me about...</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            disabled={true}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col"
                                        >
                                            {[
                                                { value: "all", label: "All new notes" },
                                                {
                                                    value: "only_shared",
                                                    label: "All new notes from shared blocknotes",
                                                },
                                                { value: "none", label: "Nothing" },
                                            ].map((item) => (
                                                <FormItem
                                                    key={item.value}
                                                    className="flex items-center space-x-2 space-y-0 text-muted-foreground"
                                                >
                                                    <FormControl>
                                                        <RadioGroupItem value={item.value} />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        {item.label}
                                                    </FormLabel>
                                                </FormItem>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="space-y-3">
                            <Label className="">Email Notifications</Label>
                            {[
                                {
                                    name: "communicationEmails",
                                    label: "Communication emails",
                                    description: "Receive emails about your workspace’s activity.",
                                },
                                {
                                    name: "marketingEmails",
                                    label: "Marketing emails",
                                    description:
                                        "Receive emails about new products, features, and more.",
                                },
                                {
                                    name: "securityEmails",
                                    label: "Security emails",
                                    description: "Receive emails about your account security.",
                                },
                            ].map((item) => (
                                <FormField
                                    key={item.name}
                                    control={form.control}
                                    name={item.name as keyof SettingsNotificationFormSchemaTypes}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg bg-background p-3 gap-2 border border-border">
                                            <div>
                                                <FormLabel>{item.label}</FormLabel>
                                                <FormDescription className="text-xs">
                                                    {item.description}
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    className="!mt-0"
                                                    disabled={true}
                                                    checked={field.value as boolean}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            ))}
                        </div>
                        <CardFooter className="p-0 items-end justify-end pt-4">
                            <Button type="submit" size="sm" disabled={true}>
                                {/* {isPending && <SpinnerGap className="mr-2 h-4 w-4 animate-spin" />} */}
                                Update notifications
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
