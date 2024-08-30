import { validTimezones } from "@/constants/timezones.constants";
import { z } from "zod";

export const LoginFormSchema = z.object({
    email: z
        .string()
        .email({ message: "Enter a valid email address." })
        .refine((value) => /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(value), {
            message: "Enter a valid email address.",
        }),
    password: z.string().min(3, { message: "Password is required." }),
});

export const SignupFormSchema = z
    .object({
        email: z
            .string()
            .email({ message: "Enter a valid email address." })
            .refine((value) => /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(value), {
                message: "Enter a valid email address.",
            }),
        password: z
            .string()
            .min(8, { message: "At least 8 characters." })
            .refine((value) => /[a-z]/.test(value), {
                message: "Include a lowercase letter.",
            })
            .refine((value) => /[A-Z]/.test(value), {
                message: "Include an uppercase letter.",
            })
            .refine((value) => /\d/.test(value), {
                message: "Include a number.",
            })
            .refine((value) => /\W|_/.test(value), {
                message: "Include a special character.",
            }),
        confirmPassword: z.string().min(1, { message: "Password is required." }),
        newsletter: z.boolean().default(false).optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });

export const InvitedSignupFormSchema = z
    .object({
        email: z
            .string()
            .email({ message: "Enter a valid email address." })
            .refine((value) => /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(value), {
                message: "Enter a valid email address.",
            }),
        password: z
            .string()
            .min(8, { message: "At least 8 characters." })
            .refine((value) => /[a-z]/.test(value), {
                message: "Include a lowercase letter.",
            })
            .refine((value) => /[A-Z]/.test(value), {
                message: "Include an uppercase letter.",
            })
            .refine((value) => /\d/.test(value), {
                message: "Include a number.",
            })
            .refine((value) => /\W|_/.test(value), {
                message: "Include a special character.",
            }),
        confirmPassword: z.string().min(1, { message: "Password is required." }),
        newsletter: z.boolean().default(false).optional(),
        inviteCode: z.string().min(1, "Invite code is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });

export const ForgotPasswordFormSchema = z.object({
    email: z
        .string()
        .email({ message: "Enter a valid email address." })
        .refine((value) => /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(value), {
            message: "Enter a valid email address.",
        }),
});

export const CreateWorkspaceFormSchema = z.object({
    businessName: z
        .string()
        .min(1, "Business name is required")
        .max(100, "Business name should not exceed 100 characters"),
    website: z
        .string()
        .regex(/^https?:\/\/(?:www\.)?(?!www\.)([a-zA-Z0-9-]+\.){1,}[a-zA-Z0-9-]+$/, {
            message: "Enter a valid URL (http/https required)",
        }),
    industry: z
        .string()
        .min(1, "Industry is required")
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
                message: "Choose a valid industry",
            },
        ),
});

export const SettingsProfileFormSchema = z.object({
    firstName: z.string().min(1, {
        message: "First name must be at least 1 characters.",
    }),
    lastName: z.string().min(1, {
        message: "Last name must be at least 1 characters.",
    }),
    email: z
        .string()
        .email({ message: "Enter a valid email address" })
        .refine((value) => value.includes("@") && value.includes("."), {
            message: "Enter a valid email address",
        }),
});

export const SettingsNotificationFormSchema = z.object({
    notesNotifications: z.enum(["all", "only_shared", "none"]).optional(),
    communicationEmails: z.boolean().optional(),
    marketingEmails: z.boolean().optional(),
    securityEmails: z.boolean().optional(),
});

export const SettingsWorkspaceFormSchema = z.object({
    workspaceName: z.string().min(1, { message: "Workspace name is required" }),
    workspaceTimezone: z.enum(validTimezones).optional(),
});

export const SettingsSecurityFormSchema = z
    .object({
        currentPassword: z.string().min(1, { message: "Password can't be empty" }),
        newPassword: z
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
        confirmNewPassword: z.string().min(1, "Password is required"),
        googleAuthentication: z.boolean().optional(),
        twoFactorAuthentication: z.boolean().optional(),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: "Passwords do not match",
        path: ["confirmNewPassword"],
    });

export const FeedbackFormSchema = z.object({
    feedbackSubject: z
        .string()
        .min(1, { message: "subject is required " })
        .max(100, { message: "subject cannot exceed 100 characters" }),
    feedbackMessage: z
        .string()
        .min(1, { message: "message is required " })
        .max(500, { message: "message cannot exceed 500 characters" }),
});

export const ConvoRenameDialogSchema = z.object({
    newConvoName: z.string().min(1, { message: "Chat name is required" }),
});
