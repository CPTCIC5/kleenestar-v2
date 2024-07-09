"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWorkspaceData } from "@/hooks/useWorkspaceData";
import { SettingsWorkspaceFormSchema } from "@/lib/zod/schemas/schema";
import { SettingsWorkspaceFormSchemaTypes } from "../../lib/types/types";
import { useLogout } from "@/hooks/useLogout";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";

export function WorkspaceNotificationForm() {
    const { workspaceData } = useWorkspaceData();
    const logoutMutation = useLogout();

    const form = useForm<SettingsWorkspaceFormSchemaTypes>({
        resolver: zodResolver(SettingsWorkspaceFormSchema),
    });

    const onSubmit = async (data: SettingsWorkspaceFormSchemaTypes) => {
        // Handle form submission
    };

    const timezones = [
        {
            group: "North America",
            items: [
                { value: "est", label: "Eastern Standard Time (EST)" },
                { value: "cst", label: "Central Standard Time (CST)" },
                { value: "mst", label: "Mountain Standard Time (MST)" },
                { value: "pst", label: "Pacific Standard Time (PST)" },
                { value: "akst", label: "Alaska Standard Time (AKST)" },
                { value: "hst", label: "Hawaii Standard Time (HST)" },
            ],
        },
        {
            group: "Europe & Africa",
            items: [
                { value: "gmt", label: "Greenwich Mean Time (GMT)" },
                { value: "cet", label: "Central European Time (CET)" },
                { value: "eet", label: "Eastern European Time (EET)" },
                { value: "west", label: "Western European Summer Time (WEST)" },
                { value: "cat", label: "Central Africa Time (CAT)" },
                { value: "eat", label: "East Africa Time (EAT)" },
            ],
        },
        {
            group: "Asia",
            items: [
                { value: "msk", label: "Moscow Time (MSK)" },
                { value: "ist", label: "India Standard Time (IST)" },
                { value: "cst_china", label: "China Standard Time (CST)" },
                { value: "jst", label: "Japan Standard Time (JST)" },
                { value: "kst", label: "Korea Standard Time (KST)" },
                { value: "ist_indonesia", label: "Indonesia Central Standard Time (WITA)" },
            ],
        },
        {
            group: "Australia & Pacific",
            items: [
                { value: "awst", label: "Australian Western Standard Time (AWST)" },
                { value: "acst", label: "Australian Central Standard Time (ACST)" },
                { value: "aest", label: "Australian Eastern Standard Time (AEST)" },
                { value: "nzst", label: "New Zealand Standard Time (NZST)" },
                { value: "fjt", label: "Fiji Time (FJT)" },
            ],
        },
        {
            group: "South America",
            items: [
                { value: "art", label: "Argentina Time (ART)" },
                { value: "bot", label: "Bolivia Time (BOT)" },
                { value: "brt", label: "Brasilia Time (BRT)" },
                { value: "clt", label: "Chile Standard Time (CLT)" },
            ],
        },
    ];

    return (
        <Card className="relative">
            <CardHeader className="p-5">
                <CardDescription>
                    Update your workspace settings. Set your preferred language and timezone.
                </CardDescription>
                <Separator />
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                        <div className="flex gap-3 w-full max-ms:flex-col">
                            <FormField
                                control={form.control}
                                name="workspaceName"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                disabled={true} // Update with mutation.isPending if needed
                                                defaultValue={workspaceData?.business_name}
                                                className="h-11 focus-visible:ring-pop-blue focus-visible:ring-2"
                                                placeholder="name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        <FormDescription>
                                            This is the name that will be displayed on your
                                            workspace.
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="timezone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Timezone</FormLabel>
                                    <Select
                                        disabled={true} // Update with mutation.isPending if needed
                                        onValueChange={field.onChange}
                                        defaultValue={"ist"}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="max-w-[280px] w-full h-11 focus:ring-pop-blue focus:ring-2">
                                                <SelectValue placeholder="Select a timezone" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {timezones.map((group) => (
                                                <SelectGroup key={group.group}>
                                                    <SelectLabel>{group.group}</SelectLabel>
                                                    {group.items.map((item) => (
                                                        <SelectItem
                                                            key={item.value}
                                                            value={item.value}
                                                        >
                                                            {item.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Your timezone is used to synchronize your data.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                className="max-sm:px-2 primary-btn-gradient"
                                disabled={true} // Add mutation.isPending if needed
                            >
                                Update workspace
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
