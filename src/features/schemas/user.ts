import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  login: z.string(),
  avatar_url: z.url().nullable().optional(),
  name: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  // blog pode vir "", então aceite string vazia também
  blog: z.url().or(z.literal("")).nullable().optional(),
});
export const UsersSchema = z.array(UserSchema);

// Perfil "leve" usado em owner dos repos e no user das issues
export const OwnerSchema = z.object({
  id: z.number(),
  login: z.string(),
  avatar_url: z.url().nullable().optional(),
});

export const UserSocialAccountSchema = z.object({
  provider: z.string(),
  url: z.url(),
});
export const UserSocialAccountsSchema = z.array(UserSocialAccountSchema);
