import { z } from "zod";

import {
    CreateSubspaceFormSchema,
    CreateWorkspaceFormSchema,
    FeedbackFormSchema,
    ForgotPasswordFormSchema,
    InvitedRegisterFormSchema,
    LoginFormSchema,
    MakeNoteFormSchema,
    RegisterFormSchema,
    SettingsNotificationFormSchema,
    SettingsProfileFormSchema,
    SettingsSecurityFormSchema,
    SettingsWorkspaceFormSchema,
} from "../zod/schemas/schema";

// verified
export type LoginFormSchemaTypes = z.infer<typeof LoginFormSchema>;
export type RegisterFormSchemaTypes = z.infer<typeof RegisterFormSchema>;
export type InvitedRegisterFormSchemaTypes = z.infer<typeof InvitedRegisterFormSchema>;
export type ForgotPasswordFormSchemaTypes = z.infer<typeof ForgotPasswordFormSchema>;
export type CreateWorkspaceFormSchemaTypes = z.infer<typeof CreateWorkspaceFormSchema>;

// unverified
export type SettingsProfileFormSchemaTypes = z.infer<typeof SettingsProfileFormSchema>;
export type SettingsNotificationFormSchemaTypes = z.infer<typeof SettingsNotificationFormSchema>;
export type SettingsWorkspaceFormSchemaTypes = z.infer<typeof SettingsWorkspaceFormSchema>;
export type SettingsSecurityFormSchemaTypes = z.infer<typeof SettingsSecurityFormSchema>;
export type FeedbackFormSchemaTypes = z.infer<typeof FeedbackFormSchema>;
export type MakeNoteFormSchemaTypes = z.infer<typeof MakeNoteFormSchema>;
export type CreateSubspaceFormSchemaTypes = z.infer<typeof CreateSubspaceFormSchema>;
