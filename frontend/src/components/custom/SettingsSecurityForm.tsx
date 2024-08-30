"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsSecurityFormSchemaTypes } from "@/lib/types/types";
import { SettingsSecurityFormSchema } from "@/lib/zod/schemas/schema";
import { useChangePassword } from "@/hooks/useChangePassword";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { useLogout } from "@/hooks/useLogout";

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

    const logoutMutation = useLogout();
    const changePasswordMutation = useChangePassword();

    const { watch } = form;
    const { current_password, new_password, confirm_new_password } = watch();

    const onSubmit = async (data: SettingsSecurityFormSchemaTypes) => {
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

        changePasswordMutation.mutate(data);
        form.reset();
    };

    return (
        <Card className="relative">
            <CardHeader className="py-5">
                <CardDescription>Update your security settings.</CardDescription>
                <Separator />
            </CardHeader>

            <CardContent>
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
                                            className="h-11 focus-visible:ring-pop-blue focus-visible:ring-2"
                                            disabled={changePasswordMutation.isPending}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Changing your password will log you out of all devices and
                                        sessions.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-3 w-full max-phone:flex-col">
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
                                                className="h-11 focus-visible:ring-pop-blue focus-visible:ring-2"
                                                disabled={changePasswordMutation.isPending}
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
                                                className="h-11 focus-visible:ring-pop-blue focus-visible:ring-2"
                                                disabled={changePasswordMutation.isPending}
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
                                                Use the Google Authenticator app to generate
                                                one-time security codes.
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                className="!mt-0"
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
                                                className="!mt-0"
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
                            <Button
                                type="submit"
                                className="max-sm:px-2 primary-btn-gradient"
                                disabled={
                                    Object.keys(form.formState.errors).length > 0 ||
                                    changePasswordMutation.isPending ||
                                    !current_password ||
                                    !new_password ||
                                    !confirm_new_password
                                }
                            >
                                Update security
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
