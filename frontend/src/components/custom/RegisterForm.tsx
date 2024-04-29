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
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Checkbox } from "@/components/ui/checkbox";
import { Controller, useForm } from "react-hook-form";
import { RegisterFormSchema } from "@/lib/zod/schemas/schema";
import { RegisterFormSchemaTypes } from "../../lib/types/types";
import { zodResolver } from "@hookform/resolvers/zod";

interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RegisterForm({ className, ...props }: RegisterFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        control,
        trigger,
    } = useForm<RegisterFormSchemaTypes>({
        resolver: zodResolver(RegisterFormSchema),
        mode: "onChange",
        defaultValues: {
            newsletter: false,
        },
    });

    const onSubmit = async (data: RegisterFormSchemaTypes) => {
        console.log(data);

        reset();
    };

    return (
        <Card className="mx-auto max-w-sm outline-none shadow-none border-none mt-[60px]">
            <CardHeader>
                <CardTitle className="text-2xl font-mainhead ">Register</CardTitle>
                <CardDescription>
                    Enter your details below to register to your account
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
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
                            <Label htmlFor="password">Password</Label>

                            <PasswordInput
                                id="password"
                                type="password"
                                disabled={isSubmitting}
                                {...register("password")}
                                onChange={(e) => {
                                    register("password").onChange(e); // Update the password field
                                    trigger("confirmPassword"); // Manually trigger validation of the confirmPassword field
                                }}
                            />
                            {errors.password && (
                                <span className="pl-[10px] text-[10px] text-destructive">
                                    {errors.password.message}
                                </span>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>

                            <PasswordInput
                                id="confirmPassword"
                                type="password"
                                disabled={isSubmitting}
                                {...register("confirmPassword")}
                            />
                            {errors.confirmPassword && (
                                <span className="pl-[10px] text-[10px] text-destructive">
                                    {errors.confirmPassword.message}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                            <Controller
                                control={control}
                                name="newsletter"
                                render={({ field }) => (
                                    <Checkbox
                                        id="newsletter"
                                        className="h-[15px] w-[15px] flex items-center justify-center"
                                        disabled={isSubmitting}
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                )}
                            />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Send me emails with tips, news, and offers.
                            </label>
                        </div>
                        <Button
                            disabled={Object.keys(errors).length > 0 || isSubmitting}
                            type="submit"
                            className="w-full"
                        >
                            {isSubmitting && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Register
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
                    Register with Google
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
