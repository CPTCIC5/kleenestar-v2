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
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsNotificationFormSchema } from "@/lib/zod/schemas/schema";
import { SettingsNotificationFormSchemaTypes } from "@/lib/types/types";
import { useLogout } from "@/hooks/useLogout";

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

    const logoutMutation = useLogout();

    function onSubmit(data: SettingsNotificationFormSchemaTypes) {
        console.log(data);
    }

    return (
        <Card className="relative">
            <CardHeader className="p-5">
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
                                    <FormLabel>Notify me about...</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            disabled={true}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
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
                                                    className="flex items-center space-x-3 space-y-0"
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

                        <div className="space-y-4">
                            <Label className="mb-4">Email Notifications</Label>
                            {[
                                {
                                    name: "communication_emails",
                                    label: "Communication emails",
                                    description: "Receive emails about your workspace’s activity.",
                                },
                                {
                                    name: "marketing_emails",
                                    label: "Marketing emails",
                                    description:
                                        "Receive emails about new products, features, and more.",
                                },
                                {
                                    name: "security_emails",
                                    label: "Security emails",
                                    description: "Receive emails about your account security.",
                                },
                            ].map((item) => (
                                <FormField
                                    key={item.name}
                                    control={form.control}
                                    name={item.name as keyof SettingsNotificationFormSchemaTypes}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                            <div className="space-y-0.5">
                                                <FormLabel>{item.label}</FormLabel>
                                                <FormDescription>
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

                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                className="max-sm:px-2 primary-btn-gradient"
                                disabled={true} // Add mutation.isPending
                            >
                                Update notifications
                            </Button>
                        </div>
                    </form>
                </Form>
                <Button
                    className="absolute bottom-6 left-6 max-sm:px-2"
                    variant="destructive"
                    onClick={() => logoutMutation.mutate()}
                >
                    Sign out
                </Button>
            </CardContent>
        </Card>
    );
}
