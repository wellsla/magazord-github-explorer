import { z } from "zod";
import { UserSchema, UserSocialAccountSchema } from "@/features/schemas/user";

export type User = z.infer<typeof UserSchema>;

export type UserSocialAccount = z.infer<typeof UserSocialAccountSchema>;
