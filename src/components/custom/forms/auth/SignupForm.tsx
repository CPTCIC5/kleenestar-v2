"use client";

import Link from "next/link";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { SignupFormSchemaTypes } from "@/types/zod.types";
import { SignupFormSchema } from "@/lib/zod/schema";
import { Info, SpinnerGap } from "@phosphor-icons/react";
import { useSignupUser } from "@/hooks/auth/useSignupUser";
import { PasswordInput } from "../../inputs/PasswordInput";

export function SignupForm() {
    const form = useForm<SignupFormSchemaTypes>({
        resolver: zodResolver(SignupFormSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            newsletter: false,
        },
    });

    const { watch } = form;
    const { email, password, confirmPassword } = watch();

    const { mutate, isPending } = useSignupUser();

    const onSubmit = (data: SignupFormSchemaTypes) => {
        mutate(data);
        form.reset();
    };

    return (
        <Card className="mt-20 mx-auto max-w-sm z-10 rounded-3xl drop-shadow-xl outline-none border-none bg-card/90">
            <CardHeader>
                <CardTitle className="text-xl font-bricolage font-bold">Signup</CardTitle>
                <CardDescription>
                    Enter your details below to signup for a new account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="mail@example.com"
                                                disabled={isPending}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="flex gap-1 items-center">
                                            <Info className="h-3 w-3 text-muted-foreground" />
                                            <span className="text-muted-foreground text-xs">
                                                enter the email you want to use for your account
                                            </span>
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <PasswordInput
                                                id="password"
                                                type="password"
                                                placeholder="password"
                                                disabled={isPending}
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    form.trigger("confirmPassword");
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Confirm password</FormLabel>
                                        <FormControl>
                                            <PasswordInput
                                                id="confirmPassword"
                                                type="password"
                                                placeholder="confirm password"
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
                                name="newsletter"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-center space-x-2 space-y-0">
                                        <FormControl>
                                            <Checkbox
                                                id="newsletter"
                                                className="h-4 w-4 flex items-center justify-center"
                                                disabled={isPending}
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>

                                        <FormLabel className="space-y-1 text-sm font-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground">
                                            Send me emails with tips, news, and offers.
                                        </FormLabel>
                                    </FormItem>
                                )}
                            />
                            <Button
                                disabled={
                                    Object.keys(form.formState.errors).length > 0 ||
                                    isPending ||
                                    !email ||
                                    !password ||
                                    !confirmPassword
                                }
                                type="submit"
                                className="w-full"
                            >
                                {isPending && <SpinnerGap className="mr-2 h-4 w-4 animate-spin" />}
                                Sign up
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                <p className="text-center text-sm text-muted-foreground">
                    By clicking continue, you agree to our{" "}
                    <Link
                        target="_blank"
                        href="https://star-clam-c0d.notion.site/Terms-of-Service-for-Kleenestar-9d9af56399da48b797a1e2d262c78e94"
                        className="underline hover:text-primary"
                    >
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                        target="_blank"
                        href="https://star-clam-c0d.notion.site/Kleenestar-Privacy-Policy-fe317d080ca34f7985b0911b4ade8529"
                        className="underline hover:text-primary"
                    >
                        Privacy Policy
                    </Link>
                    .
                </p>
            </CardFooter>
        </Card>
    );
}
