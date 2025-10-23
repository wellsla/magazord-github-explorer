import { z } from "zod";
import {
  UserSchema,
  OwnerSchema,
  UserSocialAccountSchema,
} from "@/features/schemas/user";

export type User = z.infer<typeof UserSchema>;

export type Owner = z.infer<typeof OwnerSchema>;

export type UserSocialAccount = z.infer<typeof UserSocialAccountSchema>;
