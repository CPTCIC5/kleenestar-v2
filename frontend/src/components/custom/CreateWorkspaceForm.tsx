"use client";

import * as React from "react";
import * as z from "zod";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface WorkspaceFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function CreateWorkspace({ className, ...props }: WorkspaceFormProps) {
    const form = useForm<CreateWorkspaceFormSchemaTypes>({
        resolver: zodResolver(CreateWorkspaceFormSchema),
        mode: "onChange",
    });
    const router = useRouter();
    const onSubmit = async (data: CreateWorkspaceFormSchemaTypes) => {
        console.log(data);
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/workspaces/`,
                {
                    business_name: data.businessName,
                    website_url: data.Website,
                    industry: data.selectedOption,
                },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": Cookies.get("csrftoken"),
                    },
                },
            );
            console.log(response);
            if (response.status === 200) {
                toast.success("Workspace Created Successfully!");
                setTimeout(() => {
                    router.push("/chat");
                }, 200);
            }
        } catch (error) {
            console.log(error);
            toast.warning("Failed to create Workspace, please try again");
        }
    };

    return (
        <Card className={cn(className)}>
            <CardHeader>
                <CardTitle className="text-xl font-mainhead ">Create a new workspace</CardTitle>
                <CardDescription>Enter your details below to create a workspace</CardDescription>
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
                                    <FormItem className="">
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
                                    <FormItem className="">
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
