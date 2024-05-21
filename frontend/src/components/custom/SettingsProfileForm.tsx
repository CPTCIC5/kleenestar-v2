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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { SettingsProfileFormSchema } from "@/lib/zod/schemas/schema";
import { SettingsProfileFormSchemaTypes } from "@/lib/types/types";
import React from "react";
import { useUserData } from "@/hooks/useUserData";
import { useEditUserProfile } from "@/hooks/useEditUserProfile";

export function SettingsProfileForm() {
    const { userData } = useUserData();

    const form = useForm<SettingsProfileFormSchemaTypes>({
        resolver: zodResolver(SettingsProfileFormSchema),
        defaultValues: {
            firstName: userData?.first_name,
            lastName: userData?.last_name,
            email: userData?.email,
        },
    });

    React.useEffect(() => {
        if (userData) {
            form.reset({
                firstName: userData.first_name,
                lastName: userData.last_name,
                email: userData.email,
            });
        }
    }, [userData, form]);

    const mutation = useEditUserProfile();

    const onSubmit = async (data: SettingsProfileFormSchemaTypes) => {
        if (userData) {
            mutation.mutate({
                data,
                userId: userData.id,
            });
        }
    };

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
                <CardDescription>This is how others will see you on the workspace.</CardDescription>
                <Separator />
            </CardHeader>

            <CardContent>
                {/* image and image upload section */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                        <div className="space-y-2">
                            <div className="flex gap-3 w-full max-ms:flex-col">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="First Name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Last Name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <CardDescription>
                                This is the name that will be displayed on your workspace.
                            </CardDescription>
                        </div>

                        <FormField
                            control={form.control}
                            name="email"
                            disabled={true}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="mail@gmail.com"
                                            defaultValue={userData?.email}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        To modify your email, please contact us.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end">
                            <Button type="submit" className="max-sm:px-2">
                                Update profile
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
