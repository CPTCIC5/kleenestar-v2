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
import { ForgotPasswordFormSchemaTypes } from "@/types/zod.types";
import { ForgotPasswordFormSchema } from "@/lib/zod/schema";
import { Info, SpinnerGap } from "@phosphor-icons/react";
import { useResetPasswordOfUser } from "@/hooks/auth/useResetPasswordOfUser";

export function ForgotPasswordForm() {
    const form = useForm<ForgotPasswordFormSchemaTypes>({
        resolver: zodResolver(ForgotPasswordFormSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
        },
    });

    const { email } = form.watch();

    const { mutate, isPending } = useResetPasswordOfUser();

    const onSubmit = async (data: ForgotPasswordFormSchemaTypes) => {
        mutate(data);
        form.reset();
    };

    return (
        <Card className="mx-auto max-w-sm z-10 rounded-3xl drop-shadow-xl outline-none border-none bg-card/90">
            <CardHeader>
                <CardTitle className="text-xl font-bricolage font-bold">Forgot Password</CardTitle>
                <CardDescription>Enter your details below to get a reset link</CardDescription>
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
                                                enter the email you used to sign up
                                            </span>
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />

                            <Button
                                disabled={
                                    Object.keys(form.formState.errors).length > 0 ||
                                    isPending ||
                                    !email
                                }
                                type="submit"
                                className="w-full"
                            >
                                {isPending && <SpinnerGap className="mr-2 h-4 w-4 animate-spin " />}
                                Send Reset Link
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
