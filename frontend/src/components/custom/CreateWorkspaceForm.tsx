"use client";

import * as React from "react";
import * as z from "zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

import { Input } from "@/components/ui/input";
import { Icons } from "@/assets/icons";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreateWorkspaceFormSchemaTypes } from "@/lib/types/types";
import { CreateWorkspaceFormSchema } from "@/lib/zod/schemas/schema";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import FormSuccess from "./FormSuccess";

interface WorkspaceFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function CreateWorkspace({ className, ...props }: WorkspaceFormProps) {
    const form = useForm<CreateWorkspaceFormSchemaTypes>({
        resolver: zodResolver(CreateWorkspaceFormSchema),
        mode: "onChange",
    });

    const onSubmit = (values: CreateWorkspaceFormSchemaTypes) => {
        console.log(values);
    };

    return (
        <Card className={cn(className)}>
            <CardHeader>
                <div className="mx-auto">
                    <Icons.logoDark className="h-[37px] w-[37px] mx-auto" />
                    <p className="text-2xl max-xl:text-lg mt-4 font-bold font-mainhead text-center">
                        Create a new workspace
                    </p>
                    {/* <p className="text-gray-500 underline text-center text-sm">What is a workspace?</p> */}
                </div>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex-col gap-y-10">
                            <FormField
                                control={form.control}
                                name="businessName"
                                render={({ field }) => (
                                    <FormItem className="my-4">
                                        <FormLabel>Business Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="business_name"
                                                type="text"
                                                placeholder="Your business name"
                                                disabled={form.formState.isSubmitting}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="Website"
                                render={({ field }) => (
                                    <FormItem className="my-4">
                                        <FormLabel>Website URL</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="Website"
                                                type="text"
                                                placeholder="Your website url"
                                                disabled={form.formState.isSubmitting}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="selectedOption"
                                render={({ field }) => (
                                    <FormItem className="my-4">
                                        <FormLabel>Industry</FormLabel>
                                        <Select
                                            disabled={form.formState.isSubmitting}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select your Industry" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="E-commerce">
                                                    E-commerce
                                                </SelectItem>
                                                <SelectItem value="Sales">Sales</SelectItem>
                                                <SelectItem value="Enterprise">
                                                    Enterprise
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
                                    form.formState.isSubmitting
                                }
                                type="submit"
                                className="w-full"
                            >
                                {form.formState.isSubmitting && (
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
}
