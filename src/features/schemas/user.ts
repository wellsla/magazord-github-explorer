import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  login: z.string(),
  avatar_url: z.url().nullable(),
  name: z.string(),
  bio: z.string().nullable(),
  company: z.string().nullable(),
  location: z.string().nullable(),
  blog: z.url().nullable(),
});
export const UsersSchema = z.array(UserSchema);

export const UserSocialAccountSchema = z.object({
  provider: z.string(),
  url: z.url(),
});
export const UserSocialAccountsSchema = z.array(UserSocialAccountSchema);
