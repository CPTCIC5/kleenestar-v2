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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/assets/icons";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { ForgotPasswordFormSchema } from "@/lib/zod/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordFormSchemaTypes } from "@/lib/types/types";

interface ForgotPasswordFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ForgotPasswordForm({ className, ...props }: ForgotPasswordFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ForgotPasswordFormSchemaTypes>({
        resolver: zodResolver(ForgotPasswordFormSchema),
        mode: "onChange",
    });

    const onSubmit = async (data: ForgotPasswordFormSchemaTypes) => {
        console.log(data);

        reset();
    };

    return (
        <Card className="mx-auto max-w-sm outline-none shadow-none border-none mt-[15px]">
            <CardHeader>
                <CardTitle className="text-2xl font-mainhead ">Forgot Password</CardTitle>
                <CardDescription>Enter your details below to get a reset link</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="mail@example.com"
                                disabled={isSubmitting}
                                {...register("email")}
                            />
                            {errors.email ? (
                                <span className="pl-[10px] text-[10px] text-destructive">
                                    {errors.email.message}
                                </span>
                            ) : (
                                <div className="w-full">
                                    <div className="flex gap-[5px] items-center">
                                        <InfoCircledIcon className="h-[10px] w-[10px]" />
                                        <span className="text-[10px]">
                                            enter the email address you used to login / register
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <Button
                            disabled={Object.keys(errors).length > 0 || isSubmitting}
                            type="submit"
                            className="w-full mt-[12px]"
                        >
                            {isSubmitting && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin disabled:bg-green-200" />
                            )}
                            Send Reset Link
                        </Button>
                    </div>
                </form>
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
