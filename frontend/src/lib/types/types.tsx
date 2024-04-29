import { z } from "zod";
import {
    ForgotPasswordFormSchema,
    LoginFormSchema,
    RegisterFormSchema,
} from "../zod/schemas/schema";

export type ForgotPasswordFormSchemaTypes = z.infer<typeof ForgotPasswordFormSchema>;

export type LoginFormSchemaTypes = z.infer<typeof LoginFormSchema>;
export type RegisterFormSchemaTypes = z.infer<typeof RegisterFormSchema>;
