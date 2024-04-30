import { z } from "zod";

export const ForgotPasswordFormSchema = z.object({
    email: z
        .string()
        .email()
        .refine((value) => value.includes("@") && value.includes("."), {
            message: "Enter a valid email",
        }),
});

export const LoginFormSchema = z.object({
    email: z
        .string()
        .email()
        .refine((value) => value.includes("@") && value.includes("."), {
            message: "Enter a valid email",
        }),
    password: z.string().min(1, "Password is required"),
});

export const RegisterFormSchema = z
    .object({
        email: z
            .string()
            .email()
            .refine((value) => value.includes("@") && value.includes("."), {
                message: "Enter a valid email",
            }),
        password: z
            .string()
            .min(8, "Min. 8 characters")
            .refine((value) => /[a-z]/.test(value), {
                message: "Password need a lowercase",
            })
            .refine((value) => /[A-Z]/.test(value), {
                message: "Password need a  uppercase",
            })
            .refine((value) => /\d/.test(value), {
                message: "Password need a  number",
            })
            .refine((value) => /\W|_/.test(value), {
                message: "Password need a  special character",
            }),
        confirmPassword: z.string().min(1, "Password is required"),
        newsletter: z.boolean().default(false).optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
