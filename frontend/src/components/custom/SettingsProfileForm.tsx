"use client";

import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { useRef, useState, ChangeEvent, useEffect } from "react";
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
import { useForm, set } from "react-hook-form";
import { Input } from "../ui/input";
import { SettingsProfileFormSchema } from "@/lib/zod/schemas/schema";
import { SettingsProfileFormSchemaTypes } from "@/lib/types/types";
import { useUserData } from "@/hooks/useUserData";
import { useEditUserProfile } from "@/hooks/useEditUserProfile";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Label } from "../ui/label";
import { useLogout } from "@/hooks/useLogout";

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

    useEffect(() => {
        if (userData) {
            form.reset({
                firstName: userData.first_name,
                lastName: userData.last_name,
                email: userData.email,
            });
        }
    }, [userData, form]);

    const addRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);

    const handleAddImage = () => {
        addRef.current?.click();
    };

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log(file);
        setFile(file ?? null);
        if (file) {
            const url = URL.createObjectURL(file);
            setFileUrl(url);
        }
    };

    const logoutMutation = useLogout();
    const editUserProfileMutation = useEditUserProfile(userData?.id);

    const onSubmit = (data: SettingsProfileFormSchemaTypes) => {
        const formData = new FormData();
        formData.append("first_name", data.firstName);
        formData.append("last_name", data.lastName);
        if (file) {
            formData.append("avatar", file);
        }

        editUserProfileMutation.mutate(formData);
    };

    return (
        <Card className="relative">
            <CardHeader className="py-5">
                <CardDescription>This is how others will see you on the workspace.</CardDescription>
                <Separator />
            </CardHeader>
            <CardContent>
                {/* Image and image upload section */}
                <div className="space-y-3 mb-5">
                    <Label>Image</Label>
                    <div>
                        <Avatar
                            onClick={handleAddImage}
                            className="w-14 h-14 rounded-full border-2 border-muted cursor-pointer"
                        >
                            <AvatarImage
                                className="rounded-full"
                                src={fileUrl ? fileUrl : userData?.profile?.avatar}
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
                            disabled={editUserProfileMutation.isPending}
                            name="avatar"
                            onChange={handleImageUpload}
                        />
                    </div>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                        <div className="space-y-2">
                            <div className="flex gap-3 w-full max-phone:flex-col">
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
                                                    className="h-11 focus-visible:ring-pop-blue focus-visible:ring-2"
                                                    disabled={editUserProfileMutation.isPending}
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
                                                    className="h-11 focus-visible:ring-pop-blue focus-visible:ring-2"
                                                    disabled={editUserProfileMutation.isPending}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <span className="text-[0.8rem] text-muted-foreground">
                                This is the name that will be displayed on your workspace.
                            </span>
                        </div>

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="mail@gmail.com"
                                            className="h-11 focus-visible:ring-pop-blue focus-visible:ring-2"
                                            disabled={true}
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
                            <Button
                                type="submit"
                                className="max-sm:px-2 primary-btn-gradient"
                                disabled={editUserProfileMutation.isPending}
                            >
                                Update profile
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
