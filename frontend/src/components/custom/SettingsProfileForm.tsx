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
import useUserStore from "@/lib/store/UserStore";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";

export function SettingsProfileForm() {
    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);

    const form = useForm<SettingsProfileFormSchemaTypes>({
        resolver: zodResolver(SettingsProfileFormSchema),
    });

    async function onSubmit(data: SettingsProfileFormSchemaTypes) {
        try {
            if (user === null) console.error("No user found");
            const response = await axios.patch(
                `/api/auth/users/${user?.id}/`,
                {
                    first_name: data.firstName,
                    last_name: data.lastName,
                },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": Cookies.get("csrftoken"),
                    },
                },
            );
            toast.success("Name updated successfully");
            setUser(response.data);
        } catch (err) {
            console.error(err);
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
                                                    defaultValue={user?.first_name}
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
                                                    defaultValue={user?.last_name}
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
                                            defaultValue={user?.email}
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
