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

interface ForgotPasswordFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ForgotPasswordForm({ className, ...props }: ForgotPasswordFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }

    return (
        <Card className="mx-auto max-w-sm outline-none shadow-none border-none mt-[15px]">
            <CardHeader>
                <CardTitle className="text-2xl font-mainhead ">Forgot Password</CardTitle>
                <CardDescription>Enter your details below to get a reset link</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit} className="mb-4">
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="mail@example.com"
                                disabled={isLoading}
                                required
                            />
                            <div className="w-full">
                                <div className="flex gap-[5px] items-center">
                                    <InfoCircledIcon className="h-[10px] w-[10px]" />
                                    <span className="text-[10px]">
                                        enter the email address you used to login / register
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Button disabled={isLoading} type="submit" className="w-full mt-[12px]">
                            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
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
