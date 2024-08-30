import { z } from "zod";
import {
    CreateWorkspaceFormSchema,
    FeedbackFormSchema,
    SettingsNotificationFormSchema,
    SettingsProfileFormSchema,
    SettingsSecurityFormSchema,
    SettingsWorkspaceFormSchema,
    ForgotPasswordFormSchema,
    InvitedSignupFormSchema,
    LoginFormSchema,
    SignupFormSchema,
    ConvoRenameDialogSchema,
} from "@/lib/zod/schema";

// authentication form types
export type LoginFormSchemaTypes = z.infer<typeof LoginFormSchema>;
export type SignupFormSchemaTypes = z.infer<typeof SignupFormSchema>;
export type InvitedSignupFormSchemaTypes = z.infer<typeof InvitedSignupFormSchema>;
export type ForgotPasswordFormSchemaTypes = z.infer<typeof ForgotPasswordFormSchema>;

// onboarding form types
export type CreateWorkspaceFormSchemaTypes = z.infer<typeof CreateWorkspaceFormSchema>;

// settings form types
export type SettingsProfileFormSchemaTypes = z.infer<typeof SettingsProfileFormSchema>;
export type SettingsWorkspaceFormSchemaTypes = z.infer<typeof SettingsWorkspaceFormSchema>;
export type SettingsNotificationFormSchemaTypes = z.infer<typeof SettingsNotificationFormSchema>;
export type SettingsSecurityFormSchemaTypes = z.infer<typeof SettingsSecurityFormSchema>;

//feedback form types
export type FeedbackFormSchemaTypes = z.infer<typeof FeedbackFormSchema>;

//chat form types
export type ConvoRenameDialogSchemaTypes = z.infer<typeof ConvoRenameDialogSchema>;
