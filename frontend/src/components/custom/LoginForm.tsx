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
import { PasswordInput } from "@/components/custom/PasswordInput";
import { useForm } from "react-hook-form";
import { LoginFormSchema } from "@/lib/zod/schemas/schema";
import { LoginFormSchemaTypes } from "../../lib/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoCircledIcon } from "@radix-ui/react-icons";

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<LoginFormSchemaTypes>({
        resolver: zodResolver(LoginFormSchema),
        mode: "onChange",
    });

    const onSubmit = async (data: LoginFormSchemaTypes) => {
        console.log(data);

        reset();
    };

    return (
        <Card className="mx-auto max-w-sm outline-none shadow-none border-none">
            <CardHeader>
                <CardTitle className="text-2xl font-mainhead">Login</CardTitle>
                <CardDescription>Enter your details below to login to your account</CardDescription>
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
                                            enter the email address you used to login
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                {/* add forgot password page */}
                                <Link
                                    href="/forgot-password"
                                    className="ml-auto inline-block text-sm underline"
                                >
                                    Forgot your password?
                                </Link>
                            </div>

                            <PasswordInput
                                id="password"
                                type="password"
                                placeholder="password"
                                disabled={isSubmitting}
                                {...register("password")}
                            />
                            {errors.password && (
                                <span className="pl-[10px] text-[10px] text-destructive">
                                    {errors.password.message}
                                </span>
                            )}
                        </div>
                        <Button
                            disabled={Object.keys(errors).length > 0 || isSubmitting}
                            type="submit"
                            className="w-full"
                        >
                            {isSubmitting && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Login
                        </Button>
                    </div>
                </form>
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
                    disabled={isSubmitting}
                    className="flex items-center w-full"
                >
                    {isSubmitting ? (
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
