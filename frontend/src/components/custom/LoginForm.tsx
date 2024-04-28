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

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }

    return (
        <Card className="mx-auto max-w-sm outline-none shadow-none border-none">
            <CardHeader>
                <CardTitle className="text-2xl font-mainhead">Login</CardTitle>
                <CardDescription>Enter your details below to login to your account</CardDescription>
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
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                {/* add forgot password page */}
                                <Link href="#" className="ml-auto inline-block text-sm underline">
                                    Forgot your password?
                                </Link>
                            </div>

                            <PasswordInput
                                id="password"
                                type="password"
                                disabled={isLoading}
                                required
                            />
                        </div>
                        <Button disabled={isLoading} type="submit" className="w-full">
                            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
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
                    disabled={isLoading}
                    className="flex items-center w-full"
                >
                    {isLoading ? (
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
