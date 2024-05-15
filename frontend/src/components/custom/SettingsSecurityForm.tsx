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
import { Input } from "../ui/input";
import { z } from "zod";
import { SettingsSecurityFormSchemaTypes } from "@/lib/types/types";
import { SettingsSecurityFormSchema } from "@/lib/zod/schemas/schema";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

export function SettingsSecurityForm() {
    const form = useForm<SettingsSecurityFormSchemaTypes>({
        resolver: zodResolver(SettingsSecurityFormSchema),
        mode: "onChange",
        defaultValues: {
            current_password: "",
            new_password: "",
            confirm_new_password: "",
        },
    });

    async function onSubmit(data: SettingsSecurityFormSchemaTypes) {
        if (data.new_password !== data.confirm_new_password) {
            form.setError("confirm_new_password", {
                message: "Password confirmation does not match!",
            });
            return;
        }

        if (data.new_password === data.current_password) {
            form.setError("new_password", {
                message: "New password should be different from the current password!",
            });
            form.setError("confirm_new_password", {
                message: "New password should be different from the current password!",
            });
            return;
        }

        try {
            const response = await axios.post(
                `/api/auth/change-password/`,
                {
                    current_password: data.current_password,
                    new_password: data.new_password,
                    confirm_new_password: data.confirm_new_password,
                },
                {
                    withCredentials: true,
                    headers: {
                        "X-CSRFToken": Cookies.get("csrfToken"),
                    },
                },
            );
            console.log(response.data.message);
            toast.success(response.data.message);
        } catch (error) {
            const err = error as AxiosError<{ error: string }>;
            const message = err?.response?.data?.error;
            if (message) {
                form.setError("current_password", {
                    message: message,
                });
            }
        }
    }

    return (
        <Card className="relative">
            <Button
                className="absolute bottom-6 left-6 max-sm:px-2"
                disabled={true}
                variant={"secondary"}
            >
                Delete workspace
            </Button>
            <CardHeader className="pt-3 pb-5">
                <CardDescription>Update your security settings.</CardDescription>
                <Separator />
            </CardHeader>

            <CardContent>
                {/* image and image upload section */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                        <FormField
                            control={form.control}
                            name="current_password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Current password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Current password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Change your password will log you out of all devices and
                                        sessions.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-3 w-full max-ms:flex-col">
                            <FormField
                                control={form.control}
                                name="new_password"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>New password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="New password"
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e); // Update the password field
                                                    form.trigger("confirm_new_password"); // Manually trigger validation of the confirmPassword field
                                                }}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirm_new_password"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Confirm new password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Confirm password"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="google_auth"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                        <div className="space-y-0.5">
                                            <FormLabel>Google Authenticator</FormLabel>
                                            <FormDescription>
                                                Use the Google Authenticator app to generate one
                                                time security codes.
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                disabled={true}
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="two_factor_auth"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                        <div className="space-y-0.5">
                                            <FormLabel>Two Factor Authentication</FormLabel>
                                            <FormDescription>
                                                Require a second authentication method in addition
                                                to your password.
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                disabled={true}
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit" className="max-sm:px-2">
                                Update security
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
