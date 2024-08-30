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
import { SettingsSecurityFormSchema } from "@/lib/zod/schema";
import { useForm } from "react-hook-form";
import { SettingsSecurityFormSchemaTypes } from "@/types/zod.types";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useUpdatePasswordOfUser } from "@/hooks/user/useUpdatePasswordOfUser";
import { SpinnerGap } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface SettingsSecurityFormProps {
    className?: string;
}

export function SettingsSecurityForm({ className }: SettingsSecurityFormProps) {
    const { mutate, isPending } = useUpdatePasswordOfUser();

    const form = useForm<SettingsSecurityFormSchemaTypes>({
        resolver: zodResolver(SettingsSecurityFormSchema),
        mode: "onChange",
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
            googleAuthentication: false,
            twoFactorAuthentication: false,
        },
    });

    const { currentPassword, newPassword, confirmNewPassword } = form.watch();

    const onSubmit = (data: SettingsSecurityFormSchemaTypes) => {
        const { currentPassword, newPassword, confirmNewPassword } = data;

        if (newPassword !== confirmNewPassword) {
            form.setError("confirmNewPassword", {
                message: "New passwords do not match",
            });
            return;
        }

        if (newPassword === currentPassword) {
            form.setError("newPassword", {
                message: "New password cannot be same as current password",
            });
            return;
        }

        mutate(data);
        form.reset();
    };

    return (
        <Card className={cn("bg-secondary/30", className)}>
            <CardHeader className="space-y-0 p-4">
                <CardTitle className="text-lg font-bricolage font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-foreground/60 to-foreground/95">
                    Security
                </CardTitle>
                <CardDescription className="text-muted-foreground text-xs">
                    Update your security settings.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
                        <FormField
                            control={form.control}
                            name="currentPassword"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Current password</FormLabel>
                                    <FormDescription className="text-xs">
                                        Changing your password will log you out of all devices and
                                        sessions.
                                    </FormDescription>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="current password"
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
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>New password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="new password"
                                            disabled={isPending}
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e); // Update the password field
                                                form.trigger("confirmNewPassword"); // Manually trigger validation of the confirmPassword field
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmNewPassword"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="confirm new password"
                                            disabled={isPending}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="space-y-3">
                            <Label className="">Email Notifications</Label>
                            {[
                                {
                                    name: "googleAuthentication",
                                    label: "Google Authentication",
                                    description:
                                        "Use the Google Authenticator app to generate one-time security codes.",
                                },
                                {
                                    name: "twoFactorAuthentication",
                                    label: "Two Factor Authentication",
                                    description:
                                        "Require a second authentication method in addition to your password.",
                                },
                            ].map((item) => (
                                <FormField
                                    key={item.name}
                                    control={form.control}
                                    name={item.name as keyof SettingsSecurityFormSchemaTypes}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg bg-background border border-border p-3 gap-2">
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
                            <Button
                                type="submit"
                                size="sm"
                                disabled={
                                    Object.keys(form.formState.errors).length > 0 ||
                                    isPending ||
                                    !currentPassword ||
                                    !newPassword ||
                                    !confirmNewPassword
                                }
                            >
                                {isPending && <SpinnerGap className="mr-2 h-4 w-4 animate-spin" />}
                                Update security
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
