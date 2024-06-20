import { validTimezones } from "@/constants/constants";
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

export const InvitedRegisterFormSchema = z
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
        inviteCode: z.string().min(1, "Invite code is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const CreateWorkspaceFormSchema = z.object({
    businessName: z
        .string()
        .min(1, "Business name is required")
        .max(100, "Business name should not exceed 100 characters"),
    Website: z.string().regex(/^(http:\/\/|https:\/\/)?(www\.)?[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/),
    selectedOption: z
        .string()
        .min(1, "Please select an option")
        .refine(
            (value) =>
                [
                    "Sport",
                    "Retail",
                    "Hospitality",
                    "Media",
                    "Technology",
                    "Finance",
                    "Beauty",
                    "Automotive",
                ].includes(value),
            {
                message: "Invalid option selected. Please select a valid option.",
            },
        ),
});

export const SettingsProfileFormSchema = z.object({
    firstName: z.string().min(1, {
        message: "name must be at least 1 characters.",
    }),
    lastName: z.string().min(1, {
        message: "name must be at least 1 characters.",
    }),
    email: z.string().email().optional(),
});

export const SettingsNotificationFormSchema = z.object({
    notes_notifications: z.enum(["all", "only_shared", "none"]).optional(),
    communication_emails: z.boolean().optional(),
    marketing_emails: z.boolean().optional(),
    security_emails: z.boolean().optional(),
});

export const SettingsWorkspaceFormSchema = z.object({
    workspaceName: z.string().min(1, { message: "Workspace name is required" }),
    timezone: z.enum(validTimezones).optional(),
});

export const SettingsSecurityFormSchema = z
    .object({
        current_password: z.string().min(1, { message: "Password can't be empty" }),
        new_password: z
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
        confirm_new_password: z.string().min(1, "Password is required"),
        google_auth: z.boolean().optional(),
        two_factor_auth: z.boolean().optional(),
    })
    .refine((data) => data.new_password === data.confirm_new_password, {
        message: "Passwords do not match",
        path: ["confirm_new_password"],
    });

export const FeedbackFormSchema = z.object({
    subject: z
        .string()
        .min(1, { message: "Subject is Required" })
        .max(100, { message: "Subject cannot exceed 100 characters" }),
    message: z
        .string()
        .min(1, { message: "Message is Required" })
        .max(500, { message: "Message cannot exceed 500 characters" }),
});

export const MakeNoteFormSchema = z.object({
    blocknote_id: z.number().int().positive().nonnegative(),
    note: z.string().min(1, { message: "Note is required" }).max(500, {
        message: "A Note cannot exceed 500 characters",
    }),
});
