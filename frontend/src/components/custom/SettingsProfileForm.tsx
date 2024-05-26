"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRef, useState, ChangeEvent } from "react";

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
import { set, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { SettingsProfileFormSchema } from "@/lib/zod/schemas/schema";
import { SettingsProfileFormSchemaTypes } from "@/lib/types/types";
import React from "react";
import { useUserData } from "@/hooks/useUserData";
import { useEditUserProfile } from "@/hooks/useEditUserProfile";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { toast } from "sonner";
import axios from "axios";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";

export function SettingsProfileForm() {
    const queryClient = useQueryClient();
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
            console.log(userData?.profile?.avatar);
            form.reset({
                firstName: userData.first_name,
                lastName: userData.last_name,
                email: userData.email,
            });
        }
    }, [userData, form]);

    const addRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const handleAddImage = () => {
        if (addRef.current) {
            addRef.current.click();
        }
    };
    const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        } else {
            setFile(file);
        }
    };

    const onSubmit = async (data: SettingsProfileFormSchemaTypes) => {
        try {
            const response = await axios.patch(
                `/api/auth/users/${userData?.id}/`,
                {
                    avatar: file,
                    first_name: data.firstName,
                    last_name: data.lastName,
                },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "X-CSRFToken": Cookies.get("csrftoken"),
                    },
                },
            );

            queryClient.invalidateQueries({ queryKey: ["userData"] });
            queryClient.invalidateQueries({ queryKey: ["workspaceData"] });
            toast.success("Name updated successfully");
        } catch (error) {
            toast.error("An unexpected error occurred. Please try again.");
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
                <div className="space-y-3 mb-5">
                    <CardTitle>Image</CardTitle>
                    <div>
                        <Avatar
                            onClick={handleAddImage}
                            className="w-[50px] h-[50px] rounded-full  "
                        >
                            <AvatarImage
                                className="rounded-full border-2 border-muted cursor-pointer"
                                src={userData?.profile?.avatar}
                                alt="@shadcn"
                            />
                            <AvatarFallback className="flex items-center justify-center">
                                {userData?.first_name?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <input
                            ref={addRef}
                            type="file"
                            className="hidden"
                            name="avatar"
                            onChange={handleImageUpload}
                        />
                    </div>
                </div>
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
