import { z } from "zod";
import {
    CreateWorkspaceFormSchema,
    ForgotPasswordFormSchema,
    LoginFormSchema,
    RegisterFormSchema,
    SettingsNotificationFormSchema,
    SettingsProfileFormSchema,
    SettingsWorkspaceFormSchema,
} from "../zod/schemas/schema";

export type ForgotPasswordFormSchemaTypes = z.infer<typeof ForgotPasswordFormSchema>;
export type LoginFormSchemaTypes = z.infer<typeof LoginFormSchema>;
export type RegisterFormSchemaTypes = z.infer<typeof RegisterFormSchema>;
export type CreateWorkspaceFormSchemaTypes = z.infer<typeof CreateWorkspaceFormSchema>;
export type SettingsProfileFormSchemaTypes = z.infer<typeof SettingsProfileFormSchema>;
export type SettingsNotificationFormSchemaTypes = z.infer<typeof SettingsNotificationFormSchema>;
export type SettingsWorkspaceFormSchemaTypes = z.infer<typeof SettingsWorkspaceFormSchema>;
