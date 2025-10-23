import { z } from "zod";
import {
  UserSearchItemSchema,
  UsersSearchSchema,
} from "@/features/schemas/search";

export type UserSearchItem = z.infer<typeof UserSearchItemSchema>;

export type UsersSearch = z.infer<typeof UsersSearchSchema>;
