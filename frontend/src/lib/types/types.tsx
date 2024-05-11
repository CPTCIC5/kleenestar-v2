import { z } from "zod";
import {
    CreateWorkspaceFormSchema,
    FeedbackFormSchema,
    ForgotPasswordFormSchema,
    LoginFormSchema,
    MakeNoteFormSchema,
    RegisterFormSchema,
    SettingsNotificationFormSchema,
    SettingsProfileFormSchema,
    SettingsSecurityFormSchema,
    SettingsWorkspaceFormSchema,
} from "../zod/schemas/schema";

export type ForgotPasswordFormSchemaTypes = z.infer<typeof ForgotPasswordFormSchema>;
export type LoginFormSchemaTypes = z.infer<typeof LoginFormSchema>;
export type RegisterFormSchemaTypes = z.infer<typeof RegisterFormSchema>;
export type CreateWorkspaceFormSchemaTypes = z.infer<typeof CreateWorkspaceFormSchema>;
export type SettingsProfileFormSchemaTypes = z.infer<typeof SettingsProfileFormSchema>;
export type SettingsNotificationFormSchemaTypes = z.infer<typeof SettingsNotificationFormSchema>;
export type SettingsWorkspaceFormSchemaTypes = z.infer<typeof SettingsWorkspaceFormSchema>;
export type SettingsSecurityFormSchemaTypes = z.infer<typeof SettingsSecurityFormSchema>;
export type FeedbackFormSchemaTypes = z.infer<typeof FeedbackFormSchema>;
export type MakeNoteFormSchemaTypes = z.infer<typeof MakeNoteFormSchema>;
