"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardDescription,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { PencilSimple, SpinnerGap } from "@phosphor-icons/react";
import React, { ChangeEvent, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsProfileFormSchema } from "@/lib/zod/schema";
import { useForm } from "react-hook-form";
import { SettingsProfileFormSchemaTypes } from "@/types/zod.types";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFetchUser } from "@/hooks/user/useFetchUser";
import { useUpdateUserProfile } from "@/hooks/user/useUpdateUserProfile";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface SettingsProfileFormProps {
    className?: string;
}

export function SettingsProfileForm({ className }: SettingsProfileFormProps) {
    const { data: user } = useFetchUser();
    const { mutate, isPending } = useUpdateUserProfile();
    console.log(user);

    const form = useForm<SettingsProfileFormSchemaTypes>({
        resolver: zodResolver(SettingsProfileFormSchema),
        mode: "onChange",
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
        },
    });

    useEffect(() => {
        if (user) {
            form.reset({
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
            });
        }
    }, [user, form]);

    const avatarInputRef = React.useRef<HTMLInputElement>(null);
    const [avatarFile, setAvatarFile] = React.useState<File | null>(null);
    const [avatarFileUrl, setAvatarFileUrl] = React.useState<string | null>(null);

    const handleAvatarUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            setAvatarFileUrl(URL.createObjectURL(file));
        }
    };

    const onSubmit = (data: SettingsProfileFormSchemaTypes) => {
        const { firstName, lastName, email } = data;
        const profileUpdates = new FormData();
        profileUpdates.append("first_name", firstName);
        profileUpdates.append("last_name", lastName);
        if (avatarFile) {
            if (avatarFile.size <= 500 * 1024) {
                profileUpdates.append("avatar", avatarFile);
            } else {
                toast.error("File size should be less than 500KB");
                return;
            }
        }

        if (user) {
            mutate({ userId: user.id, data: profileUpdates });
        } else {
            toast.error("User not found");
            return;
        }
    };

    return (
        <Card className={cn("bg-secondary/30", className)}>
            <CardHeader className="space-y-0 p-4">
                <CardTitle className="text-lg font-bricolage font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-foreground/60 to-foreground/95">
                    Profile
                </CardTitle>
                <CardDescription className="text-muted-foreground text-xs">
                    This is how others will see you on the workspace.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <section className="w-full rounded-lg bg-background border border-border p-3 flex items-center justify-start gap-3">
                    <div className="relative">
                        <Avatar className="w-14 h-14 rounded-full cursor-pointer">
                            <AvatarImage
                                src={
                                    avatarFileUrl
                                        ? avatarFileUrl
                                        : user?.profile?.avatar
                                        ? user?.profile?.avatar
                                        : "/default.png"
                                }
                                alt="profile-picture"
                            />
                            <AvatarFallback className="flex items-center justify-center">
                                {user?.first_name?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <Button
                            onClick={() => avatarInputRef.current?.click()}
                            variant="outline"
                            size="icon"
                            className="size-6 rounded-full absolute -bottom-1 -right-1 z-10"
                        >
                            <PencilSimple weight="duotone" className="size-4" />
                        </Button>
                        <input
                            ref={avatarInputRef}
                            type="file"
                            className="hidden"
                            disabled={isPending}
                            name="avatar"
                            accept="image/*"
                            onChange={handleAvatarUpload}
                        />
                    </div>
                    <div className="flex flex-col items-start justify-start">
                        <span className="font-bold text-muted-foreground">
                            {!user?.first_name && !user?.last_name
                                ? "Workspace user"
                                : user?.first_name + " " + user?.last_name}
                        </span>
                        <span className="text-muted-foreground/80 text-xs xs:text-sm">
                            {user?.email}
                        </span>
                    </div>
                </section>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>First name</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="first name"
                                            className=""
                                            defaultValue={user?.first_name}
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
                            name="lastName"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Last name</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="last name"
                                            className=""
                                            defaultValue={user?.last_name}
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
                            name="email"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Email</FormLabel>
                                    <FormDescription className="text-xs">
                                        To modify your email, please contact us.
                                    </FormDescription>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="mail@gmail.com"
                                            className=""
                                            defaultValue={user?.email}
                                            disabled={true}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <CardFooter className="p-0 items-end justify-end pt-4">
                            <Button type="submit" size="sm" disabled={isPending}>
                                {isPending && <SpinnerGap className="mr-2 h-4 w-4 animate-spin" />}
                                Update profile
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
