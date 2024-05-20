"use client";

import * as React from "react";

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
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface WorkspaceFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function CreateWorkspace({ className, ...props }: WorkspaceFormProps) {
    const form = useForm<CreateWorkspaceFormSchemaTypes>({
        resolver: zodResolver(CreateWorkspaceFormSchema),
        mode: "onChange",
        defaultValues: {
            businessName: "",
            Website: "",
            selectedOption: "",
        },
    });

    const { watch } = form;
    const businessName = watch("businessName");
    const Website = watch("Website");
    const selectedOption = watch("selectedOption");

    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: CreateWorkspaceFormSchemaTypes) => {
            try {
                const response = await axios.post(
                    `/api/workspaces/`,
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
            } catch (error) {
                throw error;
            }
        },
        onSuccess: () => {
            toast.success("Workspace Created Successfully!");
            queryClient.setQueryData(["hasWorkspace"], true);
            setTimeout(() => {
                router.push("/chat");
            }, 200);
        },
        onError: (error) => {
            form.reset({
                businessName: "",
                Website: "",
                selectedOption: "",
            });
            toast.error("Failed to create Workspace, please try again");
        },
    });

    const onSubmit = async (data: CreateWorkspaceFormSchemaTypes) => {
        console.log(data);
        try {
            const response = await axios.post(
                `/api/workspaces/`,
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
                    <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))}>
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
                                name="Website"
                                render={({ field }) => (
                                    <FormItem className="">
                                        <FormLabel>Website URL</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="Website"
                                                type="text"
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
                                name="selectedOption"
                                render={({ field }) => (
                                    <FormItem className="">
                                        <FormLabel>Industry</FormLabel>
                                        <Select
                                            disabled={mutation.isPending}
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
                                    mutation.isPending || !businessName || !Website || !selectedOption
                                }
                                type="submit"
                                className="w-full"
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
}
