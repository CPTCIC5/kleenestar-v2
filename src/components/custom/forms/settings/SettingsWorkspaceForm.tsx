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
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsWorkspaceFormSchema } from "@/lib/zod/schema";
import { useForm } from "react-hook-form";
import { SettingsWorkspaceFormSchemaTypes } from "@/types/zod.types";
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
import { useFetchWorkspace } from "@/hooks/workspace/useFetchWorkspace";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface SettingsWorkspaceFormProps {
    className?: string;
}

export function SettingsWorkspaceForm({ className }: SettingsWorkspaceFormProps) {
    const { data: workspace } = useFetchWorkspace();

    const form = useForm<SettingsWorkspaceFormSchemaTypes>({
        resolver: zodResolver(SettingsWorkspaceFormSchema),
        mode: "onChange",
        defaultValues: {
            workspaceName: "",
            workspaceTimezone: "ist",
        },
    });

    useEffect(() => {
        if (workspace) {
            form.reset({
                workspaceName: workspace.business_name,
                workspaceTimezone: "ist",
            });
        }
    }, [workspace, form]);

    const { workspaceName, workspaceTimezone } = form.watch();

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

    const onSubmit = (data: SettingsWorkspaceFormSchemaTypes) => {
        console.log(data);
    };

    return (
        <Card className={cn("bg-secondary/30", className)}>
            <CardHeader className="space-y-0 p-4">
                <CardTitle className="text-lg font-bricolage font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-foreground/60 to-foreground/95">
                    Workspace
                </CardTitle>
                <CardDescription className="text-muted-foreground text-xs">
                    Update your workspace settings. Set your preferred language and timezone.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
                        <FormField
                            control={form.control}
                            name="workspaceName"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Workspace name</FormLabel>
                                    <FormDescription className="text-xs">
                                        This is the name that will be displayed on your workspace.
                                    </FormDescription>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="workspace name"
                                            defaultValue={workspace?.business_name}
                                            disabled={true}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="workspaceTimezone"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Timezone</FormLabel>
                                    <FormDescription className="text-xs">
                                        Your timezone is used to synchronize your data.
                                    </FormDescription>
                                    <Select
                                        disabled={true} // Update with isPending if needed
                                        onValueChange={field.onChange}
                                        defaultValue={"ist"}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
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
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <CardFooter className="p-0 items-end justify-end pt-4">
                            <Button type="submit" size="sm" disabled={true}>
                                {/* {isPending && <SpinnerGap className="mr-2 h-4 w-4 animate-spin" />} */}
                                Update workspace
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
