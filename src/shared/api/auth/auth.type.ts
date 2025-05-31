import { z } from "zod";
import { ProfileResponseSchema, TokenResponseSchema } from "./auth.contracts";
export type IProfileResponse = z.infer<typeof ProfileResponseSchema>;
export type ITokenResponse = z.infer<typeof TokenResponseSchema>;
