import { z } from "zod";
import {
    CreateWorkspaceFormSchema,
    ForgotPasswordFormSchema,
    LoginFormSchema,
    RegisterFormSchema,
} from "../zod/schemas/schema";
import { create } from "domain";

export type ForgotPasswordFormSchemaTypes = z.infer<typeof ForgotPasswordFormSchema>;

export type LoginFormSchemaTypes = z.infer<typeof LoginFormSchema>;
export type RegisterFormSchemaTypes = z.infer<typeof RegisterFormSchema>;


export type CreateWorkspaceFormSchemaTypes = z.infer<typeof CreateWorkspaceFormSchema>;