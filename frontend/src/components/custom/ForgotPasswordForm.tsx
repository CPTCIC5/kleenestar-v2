"use client";

import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
import { Icons } from "@/assets/icons";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordFormSchema } from "@/lib/zod/schemas/schema";
import { ForgotPasswordFormSchemaTypes } from "@/lib/types/types";

interface ForgotPasswordFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ForgotPasswordForm({ className, ...props }: ForgotPasswordFormProps) {
    const form = useForm<ForgotPasswordFormSchemaTypes>({
        resolver: zodResolver(ForgotPasswordFormSchema),
        mode: "onChange",
    });

    const onSubmit = async (data: ForgotPasswordFormSchemaTypes) => {
        console.log(data);

        form.reset({
            email: "",
        });
    };

    return (
        <Card className="mx-auto max-w-sm outline-none shadow-none border-none mt-[15px]">
            <CardHeader>
                <CardTitle className="text-2xl font-mainhead ">Forgot Password</CardTitle>
                <CardDescription>Enter your details below to get a reset link</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mb-4">
                        <div className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="mail@example.com"
                                                disabled={form.formState.isSubmitting}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="flex gap-[5px] items-center text-[10px]">
                                            <InfoCircledIcon className="h-[10px] w-[10px] text-foreground" />
                                            <span className="text-[10px] text-foreground">
                                                enter the email address you used to login / register
                                            </span>
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />

                            <Button
                                disabled={
                                    Object.keys(form.formState.errors).length > 0 ||
                                    form.formState.isSubmitting
                                }
                                type="submit"
                                className="w-full mt-[12px]"
                            >
                                {form.formState.isSubmitting && (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin disabled:bg-green-200" />
                                )}
                                Send Reset Link
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                <p className="text-center text-sm text-muted-foreground">
                    By clicking continue, you agree to our{" "}
                    <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                        href="/privacy"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Privacy Policy
                    </Link>
                    .
                </p>
            </CardFooter>
        </Card>
    );
}
