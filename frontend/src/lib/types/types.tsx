import { z } from "zod";
import { ForgotPasswordFormSchema } from "../zod/schemas/schema";

export type ForgotPasswordFormSchemaTypes = z.infer<typeof ForgotPasswordFormSchema>;
