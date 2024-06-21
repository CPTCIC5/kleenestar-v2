"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/assets/icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useWorkspaceData } from "@/hooks/useWorkspaceData";
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
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import RippleLoader from "../ui/ripple-loader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ClassicLoader from "../ui/classic-loader";

interface WorkspaceFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function CreateWorkspace({ className, ...props }: WorkspaceFormProps) {
    const router = useRouter();
    const { workspaceData, isWorkspaceLoading, isWorkspaceSuccess } = useWorkspaceData();

    React.useEffect(() => {
        if (isWorkspaceSuccess) {
            if (workspaceData) {
                toast.success("Workspace already exists!");
                router.push("/chat");
            }
        }
    }, [isWorkspaceSuccess]);

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

    const mutation = useCreateWorkspace();

    const onSubmit = (data: CreateWorkspaceFormSchemaTypes) => {
        mutation.mutate(data);
        form.reset();
    };

    if (isWorkspaceLoading) {
        return (
            <div className="flex items-center justify-center p-4">
                <ClassicLoader />
            </div>
        );
    }

    return (
        <Card className={cn(className)}>
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
                                                className="h-11 focus-visible:ring-pop-blue"
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
                                                className="h-11 focus-visible:ring-pop-blue"
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
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="h-11 focus:ring-pop-blue">
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
                                    !Website ||
                                    !selectedOption
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
}
