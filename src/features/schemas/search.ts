import { z } from "zod";

export const UserSearchItemSchema = z.object({
  id: z.number(),
  login: z.string(),
  avatar_url: z.url().optional(),
  name: z.string().optional().nullable(),
});

export const UsersSearchSchema = z.object({
  total_count: z.number(),
  incomplete_results: z.boolean(),
  items: z.array(UserSearchItemSchema),
});
