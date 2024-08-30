"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/assets/icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    FormLabel,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateWorkspaceFormSchemaTypes } from "@/types/zod.types";
import { CreateWorkspaceFormSchema } from "@/lib/zod/schema";
import { SpinnerGap } from "@phosphor-icons/react";
import { useCreateWorkspaceOfUser } from "../../../../hooks/onboarding/useCreateWorkspaceOfUser";

export function CreateWorkspaceForm() {
    const router = useRouter();

    const form = useForm<CreateWorkspaceFormSchemaTypes>({
        resolver: zodResolver(CreateWorkspaceFormSchema),
        mode: "onChange",
        defaultValues: {
            businessName: "",
            website: "",
            industry: "",
        },
    });

    const { businessName, website, industry } = form.watch();

    const { mutate, isPending } = useCreateWorkspaceOfUser();

    const onSubmit = (data: CreateWorkspaceFormSchemaTypes) => {
        mutate(data);
        form.reset();
    };

    return (
        <Card className="mx-auto max-w-sm z-10 rounded-3xl drop-shadow-xl outline-none border-none bg-card/90">
            <CardHeader>
                <CardTitle className="text-xl font-bricolage font-bold">Create workspace</CardTitle>
                <CardDescription>Enter your details below to create a workspace</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="businessName"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Business name</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="businessName"
                                                type="text"
                                                placeholder="business name"
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
                                name="website"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Website</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="Website"
                                                type="text"
                                                placeholder="website url"
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
                                name="industry"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Industry</FormLabel>
                                        <Select
                                            disabled={isPending}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger
                                                    className={cn(
                                                        field.value
                                                            ? null
                                                            : "text-muted-foreground",
                                                    )}
                                                >
                                                    <SelectValue placeholder="select your industry" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Retail">Retail</SelectItem>
                                                <SelectItem value="Hospitality">
                                                    Hospitality
                                                </SelectItem>
                                                <SelectItem value="Media">Media</SelectItem>
                                                <SelectItem value="Technology">
                                                    Technology
                                                </SelectItem>
                                                <SelectItem value="Finance">Finance</SelectItem>
                                                <SelectItem value="Sport">Sport</SelectItem>
                                                <SelectItem value="Beauty">Beauty</SelectItem>
                                                <SelectItem value="Automotive">
                                                    Automotive
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                disabled={
                                    Object.keys(form.formState.errors).length > 0 ||
                                    isPending ||
                                    !businessName ||
                                    !website ||
                                    !industry
                                }
                                type="submit"
                                className="w-full"
                            >
                                {isPending && <SpinnerGap className="mr-2 h-4 w-4 animate-spin" />}
                                Create workspace
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
