"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Button, buttonVariants } from "../ui/button";
import { Icons } from "@/assets/icons";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useWorkspaceData } from "@/hooks/useWorkspaceData";
import { useCreateWorkspace } from "@/hooks/useCreateWorkspace";
import { AddClientDialogSchemaTypes } from "@/lib/types/types";
import { AddClientDialogSchema } from "@/lib/zod/schemas/schema";

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
import { Input } from "@/components/ui/input";
import { AutocompleteDropdown, type Option } from "./AutocompleteDropdown";
import countries from "@/constants/countries.json";

interface AddClientDialogProps {}

const AddClientDialog: React.FC<AddClientDialogProps> = () => {
    const router = useRouter();
    const countryOptions: Option[] = countries.map((country) => ({
        value: country.name,
        label: country.name,
    }));

    const form = useForm<AddClientDialogSchemaTypes>({
        resolver: zodResolver(AddClientDialogSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            industry: "",
            country: { value: "", label: "" },
        },
    });

    const { watch } = form;
    const name = watch("name");
    const country = watch("country");
    const industry = watch("industry");

    const mutation = useCreateWorkspace();

    const onSubmit = (data: AddClientDialogSchemaTypes) => {
        console.log(data);
        form.reset({
            name: "",
            industry: "",
            country: { value: "", label: "" },
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" className="p-6 px-3 primary-btn-gradient">
                    Add Client
                </Button>
            </DialogTrigger>
            <DialogContent
                className="rounded-xl sm:rounded-2xl w-[calc(100%-1.25rem)] max-w-lg  "
                overlayClassName="backdrop-blur-sm"
            >
                <DialogHeader className="mt-4 sm:mt-0">
                    <DialogTitle className="font-mainhead text-lg ">
                        Adding a New Client
                    </DialogTitle>
                    <DialogDescription>
                        Fill in the below details and create a fresh subspace for your new client!
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                        <div className="w-full space-y-3">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="business_name"
                                                type="text"
                                                className="h-11  focus-visible:ring-pop-blue focus-visible:ring-2"
                                                placeholder="your name"
                                                // disabled={mutation.isPending}
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
                                    <FormItem className="w-full">
                                        <FormLabel>Industry</FormLabel>
                                        <Select
                                            // disabled={mutation.isPending}
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

                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Country</FormLabel>
                                        <FormControl>
                                            <AutocompleteDropdown
                                                options={countryOptions}
                                                emptyMessage="No results."
                                                placeholder="Select your country"
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="mt-4">
                            <Button type="submit" className="px-6 py-5">
                                Add client
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default AddClientDialog;
