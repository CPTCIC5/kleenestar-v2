"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/assets/icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCreateWorkspace } from "@/hooks/useCreateWorkspace";
import { CreateWorkspaceFormSchemaTypes } from "@/lib/types/types";
import { CreateWorkspaceFormSchema } from "@/lib/zod/schemas/schema";
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
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const CreateWorkspaceForm = () => {
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

    const { watch } = form;
    const businessName = watch("businessName");
    const website = watch("website");
    const industry = watch("industry");

    const mutation = useCreateWorkspace();

    const onSubmit = (data: CreateWorkspaceFormSchemaTypes) => {
        mutation.mutate(data);
        form.reset();
    };

    return (
        <Card className="bg-card/90 rounded-3xl">
            <CardHeader>
                <CardTitle className="text-xl font-mainhead ">Create a new workspace</CardTitle>
                <CardDescription className="font-medium">
                    Enter your details below to create a workspace
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="businessName"
                                render={({ field }) => (
                                    <FormItem className="">
                                        <FormLabel>Business Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="business_name"
                                                type="text"
                                                className="h-11 focus-visible:ring-pop-blue focus-visible:ring-2"
                                                placeholder="Your business name"
                                                disabled={mutation.isPending}
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
                                    <FormItem className="">
                                        <FormLabel>Website URL</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="Website"
                                                type="text"
                                                className="h-11 focus-visible:ring-pop-blue focus-visible:ring-2"
                                                placeholder="Your website url"
                                                disabled={mutation.isPending}
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
                                    <FormItem className="">
                                        <FormLabel>Industry</FormLabel>
                                        <Select
                                            disabled={mutation.isPending}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger
                                                    className={cn(
                                                        "h-11 focus:ring-pop-blue !focus-visible:ring-2 ",
                                                        field.value
                                                            ? null
                                                            : "text-muted-foreground",
                                                    )}
                                                >
                                                    <SelectValue placeholder="Select your Industry" />
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
                                    mutation.isPending ||
                                    !businessName ||
                                    !website ||
                                    !industry
                                }
                                type="submit"
                                className="w-full h-11 primary-btn-gradient"
                            >
                                {mutation.isPending && (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Create Workspace
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
