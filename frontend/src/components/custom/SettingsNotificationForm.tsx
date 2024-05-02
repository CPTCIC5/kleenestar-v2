"use client";

import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SettingsNotificationFormSchema } from "@/lib/zod/schemas/schema";
import { SettingsNotificationFormSchemaTypes } from "../../lib/types/types";

export function SettingsNotificationForm() {
    const form = useForm<SettingsNotificationFormSchemaTypes>({
        resolver: zodResolver(SettingsNotificationFormSchema),
        defaultValues: {
            notes_notifications: "all",
            communication_emails: true,
            marketing_emails: true,
            security_emails: true,
        },
    });

    function onSubmit(data: SettingsNotificationFormSchemaTypes) {
        console.log(data);
    }

    return (
        <Card>
            <CardHeader className="pt-3 pb-5">
                <CardDescription>Configure how you receive notifications.</CardDescription>
                <Separator />
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                        <FormField
                            control={form.control}
                            name="notes_notifications"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel className="text-base">Notify me about...</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="all" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    All new notes
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="only_shared" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    All new notes from shared blocknotes
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="none" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Nothing
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="w-full">
                            <h3 className="mb-4 text-base font-medium">Email Notifications</h3>
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="communication_emails"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                            <div className="space-y-0.5">
                                                <FormLabel>Communication emails</FormLabel>
                                                <FormDescription>
                                                    Receive emails about your workspace’s activity.
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="marketing_emails"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                            <div className="space-y-0.5">
                                                <FormLabel>Marketing emails</FormLabel>
                                                <FormDescription>
                                                    Receive emails about new products, features, and
                                                    more.
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="security_emails"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                            <div className="space-y-0.5">
                                                <FormLabel>Security emails</FormLabel>
                                                <FormDescription>
                                                    Receive emails about your account security.
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit">Update notifications</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
