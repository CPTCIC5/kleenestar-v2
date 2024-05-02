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
import { SettingsProfileFormSchema } from "@/lib/zod/schemas/schema";
import { SettingsProfileFormSchemaTypes } from "@/lib/types/types";

export function SettingsProfileForm() {
    const form = useForm<SettingsProfileFormSchemaTypes>({
        resolver: zodResolver(SettingsProfileFormSchema),
        defaultValues: {},
    });

    function onSubmit(data: SettingsProfileFormSchemaTypes) {
        console.log(data);
    }

    return (
        <Card>
            <CardHeader className="pt-3 pb-5">
                <CardDescription>This is how others will see you on the workspace.</CardDescription>
                <Separator />
            </CardHeader>

            <CardContent>
                {/* image and image upload section */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Username" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name. It can be your real name
                                        or a pseudonym. You can only change this once every 30 days.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
                            <Button type="submit">Update notifications</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
