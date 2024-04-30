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
import { PasswordInput } from "@/components/custom/PasswordInput";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema } from "@/lib/zod/schemas/schema";
import { LoginFormSchemaTypes } from "../../lib/types/types";

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
    const form = useForm<LoginFormSchemaTypes>({
        resolver: zodResolver(LoginFormSchema),
        mode: "onChange",
    });

    const onSubmit = async (data: LoginFormSchemaTypes) => {
        console.log(data);

        form.reset({
            email: "",
            password: "",
        });
    };

    return (
        <Card className="mx-auto max-w-sm outline-none shadow-none border-none">
            <CardHeader>
                <CardTitle className="text-2xl font-mainhead">Login</CardTitle>
                <CardDescription>Enter your details below to login to your account</CardDescription>
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

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center">
                                            <FormLabel>Password</FormLabel>
                                            {/* add forgot password page */}
                                            <Link
                                                href="/forgot-password"
                                                className="ml-auto inline-block text-sm underline"
                                            >
                                                Forgot your password?
                                            </Link>
                                        </div>
                                        <FormControl>
                                            <PasswordInput
                                                id="password"
                                                type="password"
                                                placeholder="password"
                                                disabled={form.formState.isSubmitting}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-[10px]" />
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
                                Login
                            </Button>
                        </div>
                    </form>
                </Form>
                <div className="relative mb-4">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>
                <Button
                    variant="outline"
                    type="button"
                    disabled={form.formState.isSubmitting}
                    className="flex items-center w-full"
                >
                    {form.formState.isSubmitting ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Icons.google className="mr-2 h-4 w-4" />
                    )}{" "}
                    Login with Google
                </Button>
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
