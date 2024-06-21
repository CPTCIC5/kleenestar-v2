"use client";

import Link from "next/link";
import * as React from "react";
import { Icons } from "@/assets/icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordFormSchema } from "@/lib/zod/schemas/schema";
import { ForgotPasswordFormSchemaTypes } from "@/lib/types/types";
import { useForgotPassword } from "@/hooks/useForgotPassword";

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
import { InfoCircledIcon } from "@radix-ui/react-icons";

interface ForgotPasswordFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ForgotPasswordForm({ className, ...props }: ForgotPasswordFormProps) {
    const form = useForm<ForgotPasswordFormSchemaTypes>({
        resolver: zodResolver(ForgotPasswordFormSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
        },
    });

    const watch = form.watch;
    const { email } = watch();

    const mutation = useForgotPassword();

    const onSubmit = async (data: ForgotPasswordFormSchemaTypes) => {
        mutation.mutate(data);
        form.reset();
    };

    return (
        <Card className="mx-auto max-w-sm outline-none z-10 rounded-3xl drop-shadow-xl border-none mt-[15px] bg-card/90">
            <CardHeader>
                <CardTitle className="text-2xl font-mainhead ">Forgot Password</CardTitle>
                <CardDescription className="font-medium">
                    Enter your details below to get a reset link
                </CardDescription>
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
                                                className="h-11 focus-visible:ring-pop-blue"
                                                placeholder="mail@example.com"
                                                disabled={mutation.isPending}
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
                                    mutation.isPending ||
                                    !email
                                }
                                type="submit"
                                className="w-full mt-3 h-11 primary-btn-gradient"
                            >
                                {mutation.isPending && (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
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
                    <Link
                        target="_blank"
                        href="https://star-clam-c0d.notion.site/Terms-of-Service-for-Kleenestar-9d9af56399da48b797a1e2d262c78e94"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                        target="_blank"
                        href="https://star-clam-c0d.notion.site/Kleenestar-Privacy-Policy-fe317d080ca34f7985b0911b4ade8529"
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
