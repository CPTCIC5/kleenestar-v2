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
import { Checkbox } from "@/components/ui/checkbox";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InvitedRegisterFormSchema } from "@/lib/zod/schemas/schema";
import { InvitedRegisterFormSchemaTypes } from "../../lib/types/types";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function InvitedRegisterForm({ className, ...props }: RegisterFormProps) {
    const form = useForm<InvitedRegisterFormSchemaTypes>({
        resolver: zodResolver(InvitedRegisterFormSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            newsletter: false,
            inviteCode: "",
        },
    });

    const { watch } = form;
    const email = watch("email");
    const password = watch("password");
    const confirmPassword = watch("confirmPassword");
    const inviteCode = watch("inviteCode");

    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: InvitedRegisterFormSchemaTypes) => {
            try {
                await axios.post(
                    `/api/auth/signup/`,
                    {
                        email: data.email,
                        password: data.password,
                        confirm_password: data.confirmPassword,
                        newsletter: data.newsletter,
                        invite_code: data.inviteCode,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "X-CSRFToken": Cookies.get("csrftoken"),
                        },
                    },
                );
            } catch (error) {
                throw error;
            }
        },
        onSuccess: () => {
            toast.success("Registration Successfull!");
            queryClient.setQueryData(["loggedIn"], true);
            queryClient.setQueryData(["hasWorkspace"], true);
            setTimeout(() => {
                router.push("/chat");
            }, 200);
        },
        onError: (error) => {
            form.reset({
                email: "",
                password: "",
                confirmPassword: "",
                newsletter: false,
                inviteCode: "",
            });
            const err = error as AxiosError;
            if (err.response?.data) {
                const { email } = err.response.data as { email: string[] };
                toast.error(email[0]);
            }
        },
    });

    return (
        <Card className="mx-auto max-w-sm outline-none z-10 rounded-3xl drop-shadow-xl border-none mt-[60px]">
            <CardHeader>
                <CardTitle className="text-2xl font-mainhead ">Register</CardTitle>
                <CardDescription>
                    Enter your details below to register to your account
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
                        className="mb-4"
                    >
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

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <PasswordInput
                                                id="password"
                                                type="password"
                                                placeholder="password"
                                                disabled={mutation.isPending}
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    form.trigger("confirmPassword");
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <PasswordInput
                                                id="confirmPassword"
                                                type="password"
                                                placeholder="password"
                                                disabled={mutation.isPending}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="inviteCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Invite Code</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="inviteCode"
                                                type="text"
                                                placeholder="workspace invite code"
                                                disabled={mutation.isPending}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="newsletter"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start justify-center space-x-2 space-y-0">
                                        <FormControl>
                                            <Checkbox
                                                id="newsletter"
                                                className="h-[15px] w-[15px] flex items-center justify-center"
                                                disabled={mutation.isPending}
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            <FormLabel>
                                                Send me emails with tips, news, and offers.
                                            </FormLabel>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <Button
                                disabled={
                                    Object.keys(form.formState.errors).length > 0 ||
                                    mutation.isPending ||
                                    !email ||
                                    !password ||
                                    !confirmPassword ||
                                    !inviteCode
                                }
                                type="submit"
                                className="w-full"
                            >
                                {mutation.isPending && (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Register
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
