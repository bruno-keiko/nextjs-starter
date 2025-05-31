import { z } from "zod";

const ProfileDtoSchema = z.object({
  id: z.string(),
  bio: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
});

export const ProfileResponseSchema = z.object({
  data: ProfileDtoSchema,
});

export const TokenDtoSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
});

export const TokenResponseSchema = z.object({
  data: TokenDtoSchema,
});
